import * as React from 'react';
import {Box, Typography} from '@material-ui/core';

interface Props {
  children?: React.ReactNode;
}

export const ControlPanelTitle: React.FC<Props> = (props: Props) => {
  return (
    <Box mb={4} mt={2}>
      <Typography variant="h3">{props.children}</Typography>
    </Box>
  );
};
