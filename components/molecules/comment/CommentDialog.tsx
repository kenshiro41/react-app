import React, { FC } from 'react';
import FullDialog from '../../organisms/FullDialog';
import CommentList from './CommentList';
import AddComment from './AddComment';

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  user_name: string;
  tweet_id: number;
  user_id: number;
};

const CommentDialog: FC<Props> = ({
  isModalOpen,
  onClose,
  user_name,
  tweet_id,
  user_id,
}) => {
  return (
    <FullDialog title='コメント' open={isModalOpen} onClose={onClose}>
      <CommentList tweet_id={tweet_id} />
      <AddComment tweet_id={tweet_id} user_id={user_id} user_name={user_name} />
    </FullDialog>
  );
};

export default CommentDialog;
