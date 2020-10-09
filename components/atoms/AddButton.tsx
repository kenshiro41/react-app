import React, { FC } from 'react';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { MAIN_COLOR } from '../../util/theme';

type Props = {
  onClick: () => void;
};

const AddButton: FC<Props> = React.memo(({ onClick }) => {
  return (
    <Fab
      id='add-button'
      aria-label='add'
      style={{
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        outline: 0,
        backgroundColor: MAIN_COLOR,
      }}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Add />
    </Fab>
  );
});

export default AddButton;
