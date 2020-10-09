import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from 'material-ui-search-bar';
import { IconButton } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

import { useSearchTextLazyQuery } from '../../../graphql/gen/apis';
import { parseQuery } from '../../../util/parseQuery';
import Stories from '../../../components/organisms/Stories';
import MainLayout from '../../../components/layouts/MainLayout';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const query = parseQuery(q);
  const [text, setText] = useState(query);

  const [
    searchText,
    { data, fetchMore, networkStatus },
  ] = useSearchTextLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (query) {
      searchText({
        variables: {
          text: query,
          current: 0,
        },
      });
    }
  }, [query]);

  const handleSubmit = () => {
    router.push({ pathname: 'search', query: { q: text } });
  };

  return (
    <MainLayout
      leftContent={
        <IconButton onClick={() => router.back()}>
          <ArrowBackIos />
        </IconButton>
      }
      centerContent={
        <SearchBar
          value={query}
          onChange={(e) => setText(e)}
          onRequestSearch={handleSubmit}
        />
      }
    >
      {!data || !fetchMore || data.tweets.length === 0 ? (
        <h3 style={{ paddingTop: '10%', textAlign: 'center' }}>
          TweetまたはUserが見つかりませんでした
          <p> 🙇🏻 🙇🏼 🙇🏽 🙇🏾 🙇🏿</p>
        </h3>
      ) : (
        <Stories
          tweets={data.tweets}
          fetchMore={fetchMore}
          networkStatus={networkStatus}
        />
      )}
    </MainLayout>
  );
};

export default SearchPage;
