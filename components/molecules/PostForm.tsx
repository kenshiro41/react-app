import { useRouter } from 'next/router';
import React, { FC, FormEvent, useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { TweetsDocument, useCreateTweetMutation } from '../../graphql/gen/apis';
import { MAIN_COLOR } from '../../util/theme';
import { token } from '../../util/common';

import FullDialog from '../organisms/FullDialog';
import UploadButton from '../atoms/UploadButton';
import Images from './Images';

import { Textarea } from '../../components/atoms/Widgets';
import { useRecoilValue } from 'recoil';
import { currentIndex } from '../../recoil/atoms';
import { Alert } from '@material-ui/lab';

const SubmitButtonWrapper = styled.div`
  margin: 2%;
  padding: 2%;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

const PostForm: FC<Props> = ({ open, onClose }) => {
  const [text, setText] = useState('');
  const [pictures, setPictures] = useState<any[]>([]);
  const current = useRecoilValue(currentIndex);

  const router = useRouter();

  const [createTweetMutation, { data, loading }] = useCreateTweetMutation({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token) router.push('/login');
    console.log(current);
    createTweetMutation({
      variables: {
        newTweet: {
          text: text,
          imgs: pictures,
        },
      },
      refetchQueries: [{ query: TweetsDocument, variables: { current: 0 } }],
    })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        if (e.message === 'Token is expired') {
          router.push('/login');
        }
      });
    setPictures([]);
    setText('');
  };

  const onDrop = (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPictures((prevArray) => [...prevArray, e.target?.result]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
  const removeImage = (index: number) => {
    setPictures((currentImg) => currentImg.filter((_, i) => i !== index));
  };

  return (
    <>
      {data && <Alert>完了しました！</Alert>}
      <FullDialog open={open} onClose={onClose} title='新しいツイート'>
        <form onSubmit={handleSubmit}>
          <div>
            <Textarea
              onChange={(e) => setText(e.target.value)}
              rows={innerHeight / 50}
              placeholder='tweet'
              className='form-post-tweet'
            />
            <div style={{ color: text.length > 65535 ? 'red' : 'greenyellow' }}>
              残り{65535 - text.length}文字
            </div>
            <UploadButton onChange={onDrop} multiple />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {pictures.length !== 0 &&
                pictures.map((p, i) => (
                  <Images key={i} url={p} index={i} removeImage={removeImage} />
                ))}
            </div>
          </div>
          <SubmitButtonWrapper>
            <Button
              id='submit-button'
              type='submit'
              variant='outlined'
              color='primary'
              style={{
                borderColor: 'white',
                color: 'white',
                backgroundColor: MAIN_COLOR,
                opacity: loading || text.length === 0 ? 0.5 : 1,
              }}
              disabled={loading || text.length === 0 || text.length > 65535}
            >
              {loading ? '送信中...' : '送信'}
            </Button>
          </SubmitButtonWrapper>
        </form>
      </FullDialog>
    </>
  );
};
export default PostForm;
