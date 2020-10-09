import React, { FC } from 'react';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../util/theme';

const Style = styled.span`
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${MAIN_COLOR};
  }
`;

type Props = {
  onClick: () => void;
};

const LinkButton: FC<Props> = ({ onClick, children }) => {
  return <Style onClick={onClick}>{children}</Style>;
};

export default LinkButton;
