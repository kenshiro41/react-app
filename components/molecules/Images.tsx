import React, { FC, useState } from 'react';
import { Cancel } from '@material-ui/icons';
import { Image } from 'grommet';
import FullDialog from '../organisms/FullDialog';
import styled from 'styled-components';

const Root = styled.span`
  margin: 1%;
`;
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  height: 200px;
`;

const DeleteButton = styled.span`
  cursor: pointer;
  &:hover {
    color: rgb(180, 30, 30);
  }
`;

type Props = {
  url: string;
  index: number;
  removeImage: (index: number) => void;
};

const Images: FC<Props> = ({ url, index, removeImage }) => {
  const [isOpenImage, setIsOpenImage] = useState(false);

  return (
    <Root>
      <DeleteButton onClick={() => removeImage(index)}>
        <Cancel />
      </DeleteButton>
      <ImageWrapper>
        <Image
          fit='cover'
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpenImage(true)}
          src={url}
        />
      </ImageWrapper>
      {isOpenImage && (
        <FullDialog
          title={`画像${index + 1}`}
          open={isOpenImage}
          onClose={() => setIsOpenImage(false)}
        >
          <Image
            fit='cover'
            width={'100%'}
            height={'auto'}
            src={url}
            alt={url}
          />
        </FullDialog>
      )}
    </Root>
  );
};

export default Images;
