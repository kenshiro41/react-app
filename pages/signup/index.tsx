import React, { useState } from 'react';

import { useSignupMutation } from '../../graphql/gen/apis';
import { UserNameRegex } from '../../util/regex';
import AuthPage from '../../components/organisms/AuthPage';
import FailAlert from '../../components/molecules/FailAlert';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [validate, setValidate] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [signupMutation, { data, error }] = useSignupMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!(validate || userName === '' || password === '')) {
      signupMutation({
        variables: {
          user_name: userName,
          password: password,
        },
      });
    }

    setErrMsg('登録できませんでした。');
  };
  const changeUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setValidate(!UserNameRegex.test(value));
    setUserName(value);
  };

  return (
    <FailAlert error={error} errorMsg={errMsg}>
      <AuthPage
        type='signup'
        onSubmit={handleSubmit}
        onChangeUser={changeUser}
        onChangePassword={(e) => setPassword(e.target.value)}
        visibility={visibility}
        toggleVisibility={() => setVisibility(!visibility)}
        disabled={userName === '' || password === '' || validate}
        success={!!data}
      />
    </FailAlert>
  );
};

export default SignUp;
