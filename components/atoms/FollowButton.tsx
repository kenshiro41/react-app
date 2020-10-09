import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { BG_COLOR, MAIN_COLOR } from '../../util/theme';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFollowing: boolean;
};

const FollowButton: FC<Props> = ({ onClick, isFollowing }) => {
  const style = isFollowing
    ? {
        fontSize: '10px',
        width: '8rem',
        backgroundColor: BG_COLOR,
        color: MAIN_COLOR,
        borderColor: BG_COLOR,
      }
    : {
        fontSize: '10px',
        width: '8rem',
        borderColor: 'black',
        backgroundColor: MAIN_COLOR,
        color: BG_COLOR,
      };

  return (
    <Button variant='outlined' onClick={onClick} style={style}>
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </Button>
  );
};

export default FollowButton;
