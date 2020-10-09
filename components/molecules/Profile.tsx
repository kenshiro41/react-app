import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '@material-ui/core';
import {
  FollowingInfo,
  useFollowCountQuery,
  User,
} from '../../graphql/gen/apis';
import { MAIN_COLOR } from '../../util/theme';

import UserIcon from './UserIcon';
import LinkButton from '../atoms/LinkButton';
import EditProfile from './EditProfile';
import FullDialog from '../organisms/FullDialog';
import NavBarLayout from '../layouts/NavBarLayout';

const Root = styled.div`
  min-height: 300px;
  background-color: ${MAIN_COLOR};
  opacity: 0.9;
  justify-content: center;
  text-align: center;
  align-content: center;
`;

const FollowField = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 30%;
  padding-right: 30%;
  box-sizing: border-box;
`;

type Props = {
  user: Pick<
    User,
    'user_name' | 'id' | 'nickname' | 'user_img' | 'created_at' | 'updated_at'
  >;
  tokenCheck?: boolean;
  followInfo?: { __typename?: 'followingInfo' } & Pick<
    FollowingInfo,
    'isFollowing'
  > & {
      following: Array<
        { __typename?: 'User' } & Pick<
          User,
          'user_name' | 'nickname' | 'user_img'
        >
      >;
      followed: Array<
        { __typename?: 'User' } & Pick<
          User,
          'user_name' | 'nickname' | 'user_img'
        >
      >;
    };
};

const Profile: FC<Props> = ({ user, tokenCheck, followInfo }) => {
  const [followingModal, setFollowingModal] = useState(false);
  const [value, setValue] = useState(0);

  const { data } = useFollowCountQuery({
    variables: {
      user_id: user.id,
    },
  });

  const handleTab = (_: React.ChangeEvent<{}>, i: number) => {
    setValue(i);
  };

  return (
    <Root>
      <div>
        <UserIcon user_img={user.user_img} size={'100px'} />
        <h3>{user.user_name}</h3>
        <FollowField>
          <div>
            <LinkButton onClick={() => setFollowingModal(true)}>
              {data?.followCount.followings}人
            </LinkButton>
            フォロー
          </div>
          <div>
            <LinkButton onClick={() => setFollowingModal(true)}>
              {data?.followCount.followers}人
            </LinkButton>
            のフォロワー
          </div>
        </FollowField>

        <FullDialog
          title={value === 0 ? 'follower' : 'followed'}
          open={followingModal}
          onClose={() => setFollowingModal(false)}
        >
          <NavBarLayout
            centerContent={
              <Tabs
                style={{ textTransform: 'none' }}
                value={value}
                onChange={handleTab}
              >
                <Tab label={`Tweet`} />
                <Tab label={`お気に入り`} />
              </Tabs>
            }
          >
            {followInfo?.following.map(
              ({ user_name, nickname, user_img }, i) => (
                <div key={i}>{user_name + nickname + user_img}</div>
              )
            )}
          </NavBarLayout>
        </FullDialog>

        {tokenCheck && <EditProfile user={user} />}
      </div>
    </Root>
  );
};

export default Profile;
