import { Collapse, IconButton, useMediaQuery } from '@material-ui/core';
import { Search, ExpandLess } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { searchText } from '../../recoil/atoms';

type Props = {
  isExpanded: boolean;
  setIsExpanded: (b: boolean) => void;
};

const SearchInput: FC<Props> = ({ isExpanded, setIsExpanded }) => {
  const [text, setText] = useRecoilState(searchText);
  const router = useRouter();
  const mobile = useMediaQuery('(max-width: 540px)');

  const handleSubmit = () => {
    if (text === '') return;
    router.push({ pathname: 'search', query: { q: text } });
  };

  return mobile ? (
    <>
      <IconButton edge='end' onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ExpandLess /> : <Search />}
      </IconButton>
      <Collapse in={isExpanded} />
    </>
  ) : (
    <SearchBar onChange={(q) => setText(q)} onRequestSearch={handleSubmit} />
  );
};

export default SearchInput;
