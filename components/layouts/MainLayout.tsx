import React, { ReactNode, FC } from 'react';

import NavBarLayout from './NavBarLayout';

type Props = {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  searchInput?: ReactNode;
};

const MainLayout: FC<Props> = ({
  leftContent,
  centerContent,
  rightContent,
  searchInput,
  children,
}) => {
  return (
    <>
      <NavBarLayout
        leftContent={leftContent}
        centerContent={centerContent}
        rightContent={rightContent}
        searchInput={searchInput}
      />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
