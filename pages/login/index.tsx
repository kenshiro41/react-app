import React, { FC, useState, FormEvent } from 'react';
import { Cookies } from 'react-cookie';
import { useLoginMutation } from '../../graphql/gen/apis';

import AuthPage from '../../components/organisms/AuthPage';
import FailAlert from '../../components/molecules/FailAlert';

const cookies = new Cookies();

interface Props {}

const Login: FC<Props> = ({}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);

  const [loginMutation, { data, error }] = useLoginMutation();
  const errMsg = 'ログインできませんでした';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!(userName === '' || password === '')) {
      const res = await loginMutation({
        variables: {
          user_name: userName,
          password: password,
        },
      });

      if (!res.data) {
        console.error('not exist response data');
      } else {
        const { token, exp, user } = res.data.login;
        const expires = new Date(exp * 1000);

        cookies.set('token', token, { path: '/', expires });
        cookies.set('user', user.user_name, { path: '/', expires });
        cookies.set('nickname', user.nickname, { path: '/', expires });
      }
    }

    location.href = '/';
  };

  return (
    <FailAlert error={error} errorMsg={errMsg}>
      <AuthPage
        type='login'
        onSubmit={handleSubmit}
        onChangeUser={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        visibility={visibility}
        toggleVisibility={() => setVisibility(!visibility)}
        disabled={userName === '' || password === ''}
        success={!!data}
      />
    </FailAlert>
  );
};

export default Login;
