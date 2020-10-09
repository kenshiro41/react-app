import React, { ReactNode, FC } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { MAIN_COLOR } from '../../util/theme';

type Props = {
  position?: 'sticky' | 'fixed' | 'absolute' | 'static' | 'relative';
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  searchInput?: ReactNode;
};

const NavBarLayout: FC<Props> = ({
  position,
  leftContent,
  centerContent,
  rightContent,
  searchInput,
}) => {
  return (
    <AppBar
      position={position ? position : 'sticky'}
      style={{ backgroundColor: MAIN_COLOR }}
    >
      <Toolbar className='navbar-cotent'>
        {leftContent && <div className='navbar-right'>{leftContent}</div>}
        {centerContent && <div className='navbar-center'>{centerContent}</div>}
        {rightContent && <div className='navbar-right'>{rightContent}</div>}
      </Toolbar>
      {searchInput}
    </AppBar>
  );
};

export default NavBarLayout;
