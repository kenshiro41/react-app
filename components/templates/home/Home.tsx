import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';

import {
  useTokenCheckLazyQuery,
  useTweetsQuery,
} from '../../../graphql/gen/apis';
import { user_name, token } from '../../../util/common';

import AddButton from '../../atoms/AddButton';
import Loading from '../../atoms/Loading';
import Stories from '../../organisms/Stories';
import MainLayout from '../../layouts/MainLayout';
import UserMenu from '../../molecules/UserMenu';
import PostForm from '../../molecules/PostForm';
import NavToAuth from '../../molecules/NavToAuth';
import SearchInput from '../../molecules/SearchInput';
import { searchText } from '../../../recoil/atoms';

const Home = () => {
  const [isEnableModal, setIsEnableModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useRecoilState(searchText);

  const router = useRouter();
  const mobile = useMediaQuery('(max-width: 540px)');

  const { data, fetchMore, networkStatus } = useTweetsQuery({
    variables: { current: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const handleSubmit = () => {
    if (text !== '') {
      router.push({ pathname: 'search', query: { q: text } });
    }
  };

  const handleOpen = () => {
    setIsEnableModal(true);
  };
  const handleClose = () => {
    setIsEnableModal(false);
  };

  // check token
  const [tokenCheck, res] = useTokenCheckLazyQuery();
  useEffect(() => {
    if (token) {
      tokenCheck({
        variables: { user_name },
      });
    }
  }, [token]);

  const isLoggedIn = res.data && res.data.tokenCheck.success;

  const leftContent = isLoggedIn ? <UserMenu /> : <NavToAuth />;
  const rightContent = (
    <SearchInput isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
  );
  const searchInput = mobile && isExpanded && (
    <SearchBar
      onRequestSearch={handleSubmit}
      onChange={(e) => setText(e)}
      value={text}
    />
  );

  return (
    <MainLayout
      leftContent={leftContent}
      rightContent={rightContent}
      searchInput={searchInput}
    >
      {!data ? (
        <Loading />
      ) : (
        <Stories
          tweets={data.tweets}
          fetchMore={fetchMore}
          networkStatus={networkStatus}
        />
      )}

      {isLoggedIn && <AddButton onClick={handleOpen} />}
      {isEnableModal && <PostForm open={isEnableModal} onClose={handleClose} />}
    </MainLayout>
  );
};

export default Home;
