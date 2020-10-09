import React from 'react';
import { CircularProgress } from '@material-ui/core';

// const ripple = '/ripple.svg';

const Loading = () => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '10%',
      }}
    >
      <CircularProgress
        variant='indeterminate'
        disableShrink
        size={50}
        thickness={4}
        style={{ color: '#1a90ff', animationDuration: '550ms' }}
      />
    </div>
  );
};

export default Loading;
