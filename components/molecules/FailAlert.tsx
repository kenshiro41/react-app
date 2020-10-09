import React from 'react';
import { ApolloError } from '@apollo/client';
import { Alert } from '@material-ui/lab';

type Props = {
  error?: ApolloError;
  errorMsg: string;
};

const FailAlert: React.FC<Props> = ({ error, errorMsg, children }) => {
  return (
    <>
      {error && (
        <Alert severity='error' color='error'>
          {errorMsg}
        </Alert>
      )}
      {children}
    </>
  );
};

export default FailAlert;
