import React, { FC, useState } from 'react';
import { IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { TEXT_COLOR } from '../../../util/theme';
import CommentDialog from './CommentDialog';

type Props = {
  count: number;
  user_name: string;
  tweet_id: number;
  user_id: number;
};

const Comment: FC<Props> = ({ count, user_name, tweet_id, user_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <IconButton onClick={handleModalOpen}>
        <CommentIcon style={{ color: TEXT_COLOR }} />
        <span style={{ color: TEXT_COLOR, fontSize: '18px' }}>{count}</span>
      </IconButton>
      {isModalOpen && (
        <CommentDialog
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user_name={user_name}
          tweet_id={tweet_id}
          user_id={user_id}
        />
      )}
    </>
  );
};

export default Comment;
