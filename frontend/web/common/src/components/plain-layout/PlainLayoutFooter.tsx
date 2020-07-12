import * as React from 'react';
import {Box} from '@material-ui/core';
import {Copyright} from '../content/Copyright';

interface Props {}

export const PlainLayoutFooter: React.FC<Props> = (props: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" display="flex" mt={4}>
      <Copyright />
    </Box>
  );
};
