import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { RecoilRoot } from 'recoil';
import { PageTransition } from 'next-page-transitions';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grommet } from 'grommet';

import { initializeApollo, useApollo } from '../graphql/apollo';
import { theme } from '../util/theme';
import Loading from '../components/atoms/Loading';

import '../styles/index.scss';
import '../styles/navbar.scss';
import '../styles/tweet-card.scss';
import '../styles/user.scss';

// const TIMEOUT = 100;

const App = ({ Component, pageProps, router }: AppProps) => {
  const initialApolloState = initializeApollo();
  const client: any = useApollo(initialApolloState);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <Grommet>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          <RecoilRoot>
            <ApolloProvider client={client}>
              <PageTransition
                timeout={300}
                classNames='page-transition'
                loadingComponent={<Loading />}
                loadingDelay={500}
                loadingTimeout={{
                  enter: 400,
                  exit: 200,
                }}
                loadingClassNames='loading-indicator'
              >
                <Component key={router.route} {...pageProps} />
              </PageTransition>
            </ApolloProvider>
          </RecoilRoot>
          <style jsx global>{`
            .page-transition-enter {
              opacity: 0;
            }
            .page-transition-enter-active {
              opacity: 1;
              transition: opacity 300ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 300ms;
            }
          `}</style>
        </StyledComponentsThemeProvider>
      </Grommet>
    </>
  );
};

export default App;
