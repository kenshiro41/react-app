import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';

const cookies = new Cookies();

const UserMenu = () => {
  const [isOpenUserIcon, setIsOpenUserIcon] = useState<null | HTMLElement>(
    null
  );
  const router = useRouter();
  const user = cookies.get('user');
  return (
    <>
      <IconButton onClick={(e) => setIsOpenUserIcon(e.currentTarget)}>
        <AccountCircle
          style={{ width: '40px', height: '40px', color: 'white' }}
        />
      </IconButton>
      <Menu
        anchorEl={isOpenUserIcon}
        keepMounted
        open={Boolean(isOpenUserIcon)}
        onClose={() => setIsOpenUserIcon(null)}
      >
        <MenuList>
          <Content
            onClick={() => router.push(`/user/${user}`)}
            icon={<AccountCircle />}
          >
            プロフィール
          </Content>
        </MenuList>
        <Divider />
        <MenuList>
          <Content
            onClick={() => {
              cookies.remove('token', { path: '/' });
              cookies.remove('user', { path: '/' });
              cookies.remove('nickname', { path: '/' });
              location.reload();
            }}
            icon={<ExitToApp />}
          >
            ログアウト
          </Content>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;

type Props = {
  icon: React.ReactNode;
  onClick: () => void;
};

const Content: FC<Props> = ({ icon, onClick, children }) => {
  return (
    <MenuItem onClick={onClick} style={{ display: 'flex' }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
};
