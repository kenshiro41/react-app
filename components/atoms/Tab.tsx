import { Divider } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

const TabNavigation = styled.span`
  cursor: pointer;
  background-color: white;
  margin: 1%;
  padding: 1%;
`;

const Tab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const changeTab = (index: number) => {
    setTabIndex(index);
  };
  return (
    <div>
      <Divider style={{ color: 'white' }} />
      <div style={{ display: 'flex' }}>
        <TabNavigation onClick={() => changeTab(0)}>tab1</TabNavigation>
        <Divider style={{ color: 'white', margin: '10px' }} />
        <TabNavigation onClick={() => changeTab(1)}>tab2</TabNavigation>
        <Divider style={tabIndex === 1 ? { color: 'red' } : { color: 'red' }} />
      </div>
      {tabIndex === 0 ? <div>tab1 content</div> : <div>tab2 contrent</div>}
    </div>
  );
};

export default Tab;
