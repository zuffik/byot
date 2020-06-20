import * as React from 'react';
import {Box, Typography, WithStyles} from '@material-ui/core';

interface Props {
  children: React.ReactNode;
}

export const PlainLayoutTitle: React.FC<Props> = (props: Props) => {
  return (
    <Box mb={10}>
      <Typography variant="h3">{props.children}</Typography>
    </Box>
  );
};
