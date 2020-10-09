import React from 'react';
import { ApolloError } from '@apollo/client';

import Loading from '../atoms/Loading';
import { Alert } from '@material-ui/lab';

type Props = {
  loading: boolean;
  error?: ApolloError;
  errorMsg: string;
};

const Toast: React.FC<Props> = ({ loading, error, errorMsg, children }) => {
  return (
    <>
      {loading && <Loading />}
      {error && (
        <Alert severity='error' color='error'>
          {errorMsg}
        </Alert>
      )}
      {children}
    </>
  );
};

export default Toast;
