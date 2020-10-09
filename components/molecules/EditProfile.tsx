import { Avatar, Button, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { User, useUpdateProfileMutation } from '../../graphql/gen/apis';
import { ERR_COLOR, MAIN_COLOR, TEXT_COLOR } from '../../util/theme';
import FullDialog from '../organisms/FullDialog';
import UploadButton from '../atoms/UploadButton';
import styled from 'styled-components';
import { cookies, token } from '../../util/common';
import { UserNameRegex } from '../../util/regex';

const Form = styled.form`
  margin: 10%;
`;
const Content = styled.div`
  margin: 3%;
`;
const ValidateMsg = styled.div`
  color: ${ERR_COLOR};
  font-size: 12px;
`;

type Props = {
  user: Pick<
    User,
    'user_name' | 'id' | 'nickname' | 'user_img' | 'created_at' | 'updated_at'
  >;
};

const EditProfile: FC<Props> = ({ user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userName, setUserName] = useState<string>(user.user_name);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const [userIcon, setUserIcon] = useState<string>('');
  const [validate, setValidate] = useState(false);

  const [updateProfile, { loading, error }] = useUpdateProfileMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;
    const res = await updateProfile({
      variables: {
        input: { user_name: userName, nickname: nickname, img: userIcon },
      },
    });

    if (!res.data) {
      console.log(res.errors);
    } else {
      const { exp, user } = res.data.updateProfile;
      const expires = new Date(exp * 1000);
      cookies.remove('token');
      cookies.remove('user');
      cookies.remove('nickname');
      cookies.set('token', res.data.updateProfile.token, {
        path: '/',
        expires,
      });
      cookies.set('user', user.user_name, { path: '/', expires });
      cookies.set('nickname', user.nickname, { path: '/', expires });
    }
  };

  const onDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target || !e.target.result) return;
          setUserIcon(e.target.result.toString());
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleChangeUserName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setValidate(!UserNameRegex.test(value));
    setUserName(value);
  };

  return (
    <>
      <Button
        type='button'
        onClick={() => setIsEditMode(!isEditMode)}
        variant='outlined'
        style={{ backgroundColor: TEXT_COLOR }}
      >
        編集
      </Button>
      <FullDialog
        open={isEditMode}
        onClose={() => setIsEditMode(false)}
        title='User Edit'
      >
        <Form onSubmit={handleSubmit}>
          <Content>
            <TextField
              required
              variant='filled'
              label='ユーザーネーム'
              defaultValue={user.nickname}
              onChange={handleChangeUserName}
              style={{ backgroundColor: TEXT_COLOR, borderRadius: '10px' }}
            />
            {error?.message ===
              'GraphQL error: pq: duplicate key value violates unique constraint "users_user_name_key"' && (
              <ValidateMsg>
                そのユーザーネームはすでに使われています
              </ValidateMsg>
            )}
            {validate && (
              <ValidateMsg>そのユーザーネームは使えません</ValidateMsg>
            )}
          </Content>
          <Content>
            <TextField
              required
              variant='filled'
              label='ニックネーム'
              defaultValue={user.nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ backgroundColor: TEXT_COLOR, borderRadius: '10px' }}
            />
          </Content>
          <Content>
            <UploadButton onChange={onDrop} />
          </Content>
          <Content>
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {userIcon && (
                <Avatar style={{ width: '120px', height: '120px' }}>
                  <img width={'100%'} height={'100%'} src={userIcon} />
                </Avatar>
              )}
            </div>
          </Content>
          <Content>
            <Button
              variant='outlined'
              type='submit'
              disabled={loading || validate}
              style={{ backgroundColor: MAIN_COLOR }}
            >
              保存
            </Button>
          </Content>
        </Form>
      </FullDialog>
    </>
  );
};

export default EditProfile;
