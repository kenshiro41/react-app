import React, { FC, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';
import { TweetData } from '../../graphql/gen/apis';
import Loading from '../atoms/Loading';

import TweetCard from '../molecules/TweetCard';

const shrinkWidth = '13vw';
const StoriesStyle = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 700px) {
    & {
      margin-left: ${shrinkWidth};
      margin-right: ${shrinkWidth};
    }
  }
`;

type Props = {
  tweets: Array<
    { __typename?: 'TweetData' } & Pick<
      TweetData,
      | 'id'
      | 'tweet_name'
      | 'text'
      | 'created_at'
      | 'user_id'
      | 'user_name'
      | 'nickname'
      | 'user_img'
      | 'ImgCount'
      | 'CommentCount'
      | 'FavCount'
      | 'isFavorite'
    >
  >;
  fetchMore: Function;
  networkStatus: number;
};

const Stories: FC<Props> = ({ tweets, fetchMore, networkStatus }) => {
  const [current, setCurrent] = useState(0);
  return (
    <StoriesStyle>
      {tweets.map((tweet, key) => (
        <React.Fragment key={key}>
          <TweetCard tweet={tweet} />
          {key === tweets.length - 2 && (
            <Waypoint
              onEnter={() => {
                fetchMore({
                  variables: {
                    current: current + 10,
                  },

                  updateQuery: (pv: any, { fetchMoreResult }: any) => {
                    if (!fetchMoreResult) {
                      return pv;
                    }
                    console.log(fetchMoreResult);
                    return Object.assign({}, pv, {
                      tweets: [...pv.tweets, ...fetchMoreResult.tweets],
                    });
                  },
                });
                setCurrent((prev) => prev + 10);
              }}
            />
          )}
        </React.Fragment>
      ))}
      {networkStatus === 3 && <Loading />}
    </StoriesStyle>
  );
};

export default Stories;
