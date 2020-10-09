import React, { FC } from 'react';
import styled from 'styled-components';

import { TEXT_COLOR } from '../../util/theme';
import { Image } from '@material-ui/icons';

const Label = styled.label`
  background: rgba(26, 207, 41, 0.7);
  color: ${TEXT_COLOR};
  cursor: pointer;
  padding: 15px 30px;
  display: inline-block;
  border-radius: 10px;
`;
const Input = styled.input`
  background: none;
  box-shadow: none;
  display: none;
`;

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  multiple?: boolean;
};

const UploadButton: FC<Props> = ({ onChange, multiple }) => {
  return (
    <div>
      <Label>
        <div style={{ display: 'flex', color: TEXT_COLOR }}>
          <Image />
        </div>
        <Input
          onChange={onChange}
          type='file'
          accept='image/*'
          multiple={multiple}
        />
      </Label>
    </div>
  );
};

export default UploadButton;
