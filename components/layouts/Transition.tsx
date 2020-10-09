import React, { forwardRef, ReactElement, Ref } from 'react';
import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

export const Transition = forwardRef(
  (props: TransitionProps & { children?: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction='up' ref={ref} {...props} />;
  }
);
