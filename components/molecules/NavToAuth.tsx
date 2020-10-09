import React from 'react';
import { useRouter } from 'next/router';
import { IconButton } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { Login } from 'grommet-icons';

import { BG_COLOR } from '../../util/theme';

const NavToAuth = () => {
  const router = useRouter();

  const style = {
    width: '30px',
    height: '30px',
    color: BG_COLOR,
  };
  return (
    <>
      <IconButton onClick={() => router.push('/login')}>
        <Login color={BG_COLOR} style={style} />
      </IconButton>
      <IconButton onClick={() => router.push('/signup')}>
        <PersonAdd style={style} />
      </IconButton>
    </>
  );
};

export default NavToAuth;
