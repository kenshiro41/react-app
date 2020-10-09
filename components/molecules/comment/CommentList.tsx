import { InfiniteScroll } from 'grommet';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useCommentsQuery } from '../../../graphql/gen/apis';
import Loading from '../../atoms/Loading';
import CommentCard from './CommentCard';

const Root = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  display: block;
  text-align: center;
`;

type Props = {
  tweet_id: number;
};

const CommentList: FC<Props> = ({ tweet_id }) => {
  const { data, loading } = useCommentsQuery({
    variables: {
      tweet_id,
    },
  });

  return (
    <Root>
      {loading && <Loading />}
      {!data || data.comments.length === 0 ? null : (
        <InfiniteScroll items={data.comments}>
          {(comment: any, key: number) => (
            <CommentCard key={key} comment={comment} />
          )}
        </InfiniteScroll>
      )}
    </Root>
  );
};

export default CommentList;
