import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 80%;
  border-radius: 10px;
  font-size: 16px;
  &::placeholder {
    text-align: center;
    font-weight: bold;
  }
`;

export const Text = styled.div`
  word-break: break-all;
`;
