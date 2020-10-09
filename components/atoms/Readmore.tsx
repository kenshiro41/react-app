import React, { FC, useState } from 'react';
import styled from 'styled-components';

const ToggleText = styled.span`
  cursor: pointer;
  color: grey;
`;

type Props = {
  text: string;
};
const Readmore: FC<Props> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const firstText = text.slice(0, 300);

  return (
    <div>
      {text.length >= 300 ? (
        <>
          {!isOpen ? (
            <>
              {firstText}
              <ToggleText onClick={() => setIsOpen(true)}>
                ...Show more
              </ToggleText>
            </>
          ) : (
            <>
              {text}
              <p>
                <ToggleText onClick={() => setIsOpen(false)}> Close</ToggleText>
              </p>
            </>
          )}
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default Readmore;
