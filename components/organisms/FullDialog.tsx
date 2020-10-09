import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { BG_COLOR } from '../../util/theme';
import NavBarLayout from '../layouts/NavBarLayout';
import { Transition } from '../layouts/Transition';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
};

const FullDialog: FC<Props> = ({ open, onClose, title, children }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <NavBarLayout
        leftContent={
          <IconButton className='close-button' onClick={onClose}>
            <Close />
          </IconButton>
        }
        centerContent={<h3>{title}</h3>}
      >
        <DialogTitle>
          <Toolbar>
            <IconButton edge='start' onClick={onClose} aria-label='close'>
              <Close />
            </IconButton>
          </Toolbar>
        </DialogTitle>
      </NavBarLayout>
      <DialogContent
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          alignContent: 'center',
          backgroundColor: BG_COLOR,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FullDialog;
