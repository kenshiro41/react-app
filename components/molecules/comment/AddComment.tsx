import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useTokenCheckLazyQuery,
  useFollowInfoLazyQuery,
  useAddCommentMutation,
  CommentsDocument,
  FollowInfoDocument,
  TweetsDocument,
  useFollowUserMutation,
  FollowCountDocument,
} from '../../../graphql/gen/apis';
import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../../../util/theme';
import { token } from '../../../util/common';
import FollowButton from '../../atoms/FollowButton';

const Footer = styled.footer`
  position: sticky;
  bottom: 0;
`;
const Form = styled.form`
  display: flex;
`;
const Textarea = styled.textarea`
  width: 100%;
  max-width: 700px;
  font-size: 18px;
  resize: none;
  background-color: ${TEXT_COLOR};
  border-radius: 7px;
`;
const SubmitButton = styled.button`
  width: 100px;
  border-radius: 7px;
  background-color: ${MAIN_COLOR};
  border-color: ${BG_COLOR};
`;

type Props = {
  tweet_id: number;
  user_id: number;
  user_name: string;
};

const AddComment: FC<Props> = ({ tweet_id, user_id, user_name }) => {
  const [comment, setComment] = useState('');
  const [addCommentMutation] = useAddCommentMutation({
    refetchQueries: [{ query: CommentsDocument, variables: { tweet_id } }],
  });
  const [tokenCheck, checked] = useTokenCheckLazyQuery();
  const [followInfoQuery, followInfo] = useFollowInfoLazyQuery();
  const [followUserMutation] = useFollowUserMutation({
    refetchQueries: [
      { query: FollowInfoDocument, variables: { user_name } },
      { query: TweetsDocument, variables: { current: 0 } },
      { query: FollowCountDocument, variables: { user_id } },
    ],
  });

  const success = checked.data?.tokenCheck.success;
  const [isFollowing, setIsFollowing] = useState(
    Boolean(followInfo.data?.followInfo.isFollowing)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment !== '') {
      addCommentMutation({
        variables: {
          input: { tweet_id, comment },
        },
      });
    }
  };
  const handleFollowing = () => {
    if (token) {
      followUserMutation({
        variables: {
          input: { followed_id: user_id, folowStatus: !isFollowing },
        },
      });
      setIsFollowing(!isFollowing);
    }
  };

  useEffect(() => {
    if (token && user_name) {
      console.log(user_name);
      tokenCheck({
        variables: { user_name: user_name },
      });
      followInfoQuery({
        variables: { user_name: user_name },
      });
    }
    if (followInfo.data) {
      setIsFollowing(Boolean(followInfo.data.followInfo.isFollowing));
    }
  }, [token, user_name, followInfo.data]);
  return (
    <Footer>
      {success || isFollowing ? (
        <Form onSubmit={handleSubmit}>
          <Textarea
            placeholder='コメント'
            rows={2}
            onChange={(e) => setComment(e.target.value)}
          />
          <SubmitButton type='submit'>送信</SubmitButton>
        </Form>
      ) : (
        <div style={{ color: TEXT_COLOR }}>
          <div>コメントするにはこの人をフォローしてください</div>
          <span>
            <FollowButton onClick={handleFollowing} isFollowing={isFollowing} />
          </span>
        </div>
      )}
    </Footer>
  );
};

export default AddComment;
