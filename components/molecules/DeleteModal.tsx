import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { currentIndex } from '../../recoil/atoms';
import {
  TweetsDocument,
  TweetsQuery,
  useDeleteTweetMutation,
} from '../../graphql/gen/apis';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  tweet_id: number;
};

const DeleteModal: FC<Props> = ({
  title,
  open,
  onClose,
  tweet_id,
  children,
}) => {
  const current = useRecoilValue(currentIndex);
  const [deleteTweetMutation, { error }] = useDeleteTweetMutation();

  const handleDeleteTweet = async () => {
    const res = await deleteTweetMutation({
      variables: { tweet_id },
      update: (cache, { data }) => {
        const originTweet = cache.readQuery<TweetsQuery>({
          query: TweetsDocument,
          variables: { current },
        });
        if (originTweet && data) {
          const updateTweets = originTweet.tweets.filter(
            (item) => item.id !== tweet_id
          );

          cache.writeQuery({
            query: TweetsDocument,
            variables: { current },
            data: {
              tweets: updateTweets,
            },
          });
        }
      },
    });
    if (res.data) {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {error && <Alert severity='error'>削除できませんでした</Alert>}

        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <Button autoFocus onClick={onClose} color='primary'>
            キャンセル
          </Button>
          <Button onClick={handleDeleteTweet} style={{ color: 'red' }}>
            削除
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
