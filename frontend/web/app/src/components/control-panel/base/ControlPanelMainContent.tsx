import * as React from 'react';
import {Box} from '@material-ui/core';

interface Props {
  children?: React.ReactNode;
}

export const ControlPanelMainContent: React.FC<Props> = (props: Props) => {
  return (
    <Box px={4} pt={4}>
      {props.children}
    </Box>
  );
};
