import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import {
  useTokenCheckLazyQuery,
  useFollowUserMutation,
  useUserInfoLazyQuery,
  useFollowInfoLazyQuery,
  FollowCountDocument,
  FollowInfoDocument,
  TweetsDocument,
  useTweetByUserLazyQuery,
} from '../../../graphql/gen/apis';
import { token } from '../../../util/common';
import { parseQuery } from '../../../util/parseQuery';

import Profile from '../../molecules/Profile';
import Stories from '../../organisms/Stories';
import MainLayout from '../../layouts/MainLayout';
import FollowButton from '../../atoms/FollowButton';
import NavBarLayout from '../../layouts/NavBarLayout';
import Loading from '../../atoms/Loading';
import NotFound from '../../../pages/404';

const UserPage = () => {
  const [value, setValue] = useState(0);

  const router = useRouter();
  const { user } = router.query;
  const user_name = parseQuery(user);

  const [userInfo, { data, loading, networkStatus }] = useUserInfoLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [userTweets, tweets] = useTweetByUserLazyQuery();

  const [tokenCheck, checked] = useTokenCheckLazyQuery();
  const [followInfoQuery, followInfo] = useFollowInfoLazyQuery();
  const [followUserMutation] = useFollowUserMutation({
    refetchQueries: [
      { query: FollowInfoDocument, variables: { user_name } },
      { query: TweetsDocument, variables: { current: 0 } },
    ],
  });

  const handleChange = (_: React.ChangeEvent<{}>, tabIndex: number) => {
    setValue(tabIndex);
  };

  // フォロー/アンフォローの実行
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // ユーザー情報 & Tweets取得
    if (user_name) {
      userInfo({ variables: { user_name } });
      userTweets({
        variables: {
          user_name,
          current: 0,
        },
      });
    }
    // フォロー実行
    if (token && user_name) {
      tokenCheck({ variables: { user_name } });
      followInfoQuery({
        variables: { user_name },
      });
    }
    // フォロー情報のUI変更
    if (followInfo.data) {
      setIsFollowing(Boolean(followInfo.data.followInfo.isFollowing));
    }
  }, [token, user_name, followInfo.data]);

  const handleFollowing = () => {
    if (token && data) {
      followUserMutation({
        variables: {
          input: {
            followed_id: data.userInfo.id,
            folowStatus: !isFollowing,
          },
        },
        refetchQueries: [
          {
            query: FollowCountDocument,
            variables: { user_id: data.userInfo.id },
          },
        ],
      });
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <div className='user'>
      <MainLayout
        leftContent={
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
        }
        centerContent={<h3>{data?.userInfo.nickname}</h3>}
      >
        {loading && <Loading />}
        {data ? (
          <>
            <Profile
              user={data.userInfo}
              tokenCheck={checked.data?.tokenCheck.success}
              followInfo={followInfo.data?.followInfo}
            />
            <NavBarLayout
              position='static'
              leftContent={
                <Tabs value={value} onChange={handleChange}>
                  <Tab style={{ textTransform: 'none' }} label={`Tweet`} />
                  <Tab style={{ textTransform: 'none' }} label={`お気に入り`} />
                </Tabs>
              }
              rightContent={
                !checked.data?.tokenCheck.success && (
                  <FollowButton
                    onClick={handleFollowing}
                    isFollowing={isFollowing}
                  />
                )
              }
            />

            {value === 0 ? (
              tweets.data ? (
                <Stories
                  tweets={tweets.data.tweets}
                  fetchMore={tweets.fetchMore}
                  networkStatus={networkStatus}
                />
              ) : (
                <Loading />
              )
            ) : (
              <div>お気に入り</div>
            )}
          </>
        ) : (
          <NotFound />
        )}
      </MainLayout>
    </div>
  );
};

export default UserPage;
