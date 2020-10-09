import React, { ChangeEvent, FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../../util/theme';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-content: center;
  background-color: ${MAIN_COLOR};
  width: 100vw;
  height: 100vh;
  margin-top: 10%;
  margin: 0 auto;
  max-width: 500px;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  margin-top: 10%;
`;
const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5%;
  margin: 5%;
  text-align: center;
  align-content: center;
  justify-content: center;
  max-width: 400px;
`;
const FormItem = styled.div`
  margin: 3%;
`;

const ButtonStyle = styled.button`
  margin-top: 30%;
  background-color: ${BG_COLOR};
  color: ${TEXT_COLOR};
  border: 0.5px solid ${TEXT_COLOR};
  border-radius: 10px;
  width: 100%;
`;

type Props = {
  type: 'login' | 'signup';
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeUser: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangePassword: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  visibility: boolean;
  toggleVisibility: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  disabled: boolean;
  success: boolean;
};

const AuthPage: FC<Props> = ({
  type,
  onSubmit,
  onChangeUser,
  onChangePassword,
  visibility,
  toggleVisibility,
  disabled,
  success,
}) => {
  const router = useRouter();
  const packageName = type === 'login' ? 'ログイン' : '登録';
  return (
    <>
      {success && (
        <Alert
          onClick={() => router.push(type === 'login' ? '/' : '/login')}
          severity='success'
          color='success'
        >
          {packageName}に成功しました。
          {type === 'login' ? 'ホーム画面' : 'ログイン画面'}
          に移動します。
        </Alert>
      )}
      <Root>
        <Wrapper>
          <h1 style={{ color: BG_COLOR }}>{packageName}</h1>
          <FormStyle onSubmit={onSubmit}>
            <FormItem>
              <FormControl>
                <InputLabel htmlFor={`${type}-userid`}>User Name</InputLabel>
                <Input
                  id={`${type}-userid`}
                  onChange={onChangeUser}
                  startAdornment={
                    <InputAdornment position='start'>
                      <IconButton>
                        <AccountCircle />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormControl>
                <InputLabel htmlFor={`${type}-password`}>Password</InputLabel>
                <Input
                  id={`${type}-password`}
                  type={visibility ? 'text' : 'password'}
                  onChange={onChangePassword}
                  startAdornment={
                    <InputAdornment position='start'>
                      <IconButton
                        onClick={toggleVisibility}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visibility ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <ButtonStyle
                className='auth-button'
                type='submit'
                disabled={disabled}
                style={{
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {packageName}
              </ButtonStyle>
            </FormItem>
            {type === 'login' && (
              <div style={{ textAlign: 'center' }}>
                アカウントをお持ちでない場合
                <p>
                  <Link href='/signup'>sign up</Link>
                </p>
              </div>
            )}
          </FormStyle>
        </Wrapper>
      </Root>
    </>
  );
};

export default AuthPage;
