import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Cookies } from 'react-cookie';
import { baseUrl } from '../util/config';

// const url = `http://${baseUrl}/graphql`;
// const wsUrl = `ws://${baseUrl}/graphql`;

const url =
  process.env.NODE_ENV === 'production'
    ? `https://${baseUrl}/graphql`
    : `http://${baseUrl}/graphql`;

const wsUrl =
  process.env.NODE_ENV === 'production'
    ? `wss://${baseUrl}/graphql`
    : `ws://${baseUrl}/graphql`;

console.log(`connect to ${url}`);

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const cookies = new Cookies();
const token = cookies.get('token');
const httpLink = new HttpLink({
  uri: url,
  headers: {
    token: token || '',
  },
});
const wsLink = process.browser
  ? new WebSocketLink({
      uri: wsUrl,
      options: { reconnect: true },
    })
  : null;
const links = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

const link = ApolloLink.from([links]);

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
