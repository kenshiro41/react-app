import React, { FC } from 'react';
import { Avatar } from 'grommet';
import { Person } from '@material-ui/icons';
import styled from 'styled-components';

import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../../util/theme';
import { s3Url } from '../../util/config';

const Root = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

type Props = {
  onClick?: () => void;
  user_img?: string | null;
  size: string;
};

const UserIcon: FC<Props> = ({ onClick, user_img, size }) => {
  const imgUrl = s3Url + user_img;

  return (
    <Root>
      <Avatar
        className='profile-avatar'
        style={{
          width: size,
          height: size,
          backgroundColor: BG_COLOR,
          color: TEXT_COLOR,
          margin: '10px',
          borderColor: MAIN_COLOR,
        }}
        border
      >
        {!user_img || user_img === null ? (
          <span onClick={onClick} style={{ cursor: 'pointer' }}>
            <Person />
          </span>
        ) : (
          <span onClick={onClick}>
            <img
              style={{ width: size, height: size }}
              src={imgUrl}
              alt={imgUrl}
              decoding='async'
            />
          </span>
        )}
      </Avatar>
    </Root>
  );
};
export default UserIcon;
