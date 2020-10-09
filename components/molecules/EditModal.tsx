import React, { FC, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import styled from 'styled-components';

import { TweetData, useUpdateTweetMutation } from '../../graphql/gen/apis';
import { Textarea } from '../../components/atoms/Widgets';
import { token } from '../../util/common';

const ButtonField = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const TextareaWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  tweet: TweetData;
};

const EditModal: FC<Props> = ({ open, onClose, tweet }) => {
  const [editText, setEditText] = useState(tweet.text);

  const [updateTweetMutation] = useUpdateTweetMutation();

  const handleEdit = () => {
    if (token && (editText !== tweet.text || '')) {
      updateTweetMutation({
        variables: {
          input: { text: editText, tweet_id: tweet.id },
        },
      });
    }
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextareaWrapper>
          <Textarea
            rows={8}
            onChange={(e) => setEditText(e.target.value)}
            defaultValue={tweet.text}
          />
        </TextareaWrapper>
      </DialogContent>
      <ButtonField>
        <Button autoFocus onClick={onClose} color='primary'>
          キャンセル
        </Button>
        <Button onClick={handleEdit} style={{ color: 'red' }}>
          編集
        </Button>
      </ButtonField>
    </Dialog>
  );
};

export default EditModal;
