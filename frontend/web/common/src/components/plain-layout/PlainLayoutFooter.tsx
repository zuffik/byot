import * as React from 'react';
import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {useTranslation} from '@byot-frontend/common/src/i18n/UseTranslation';
import {WithStyles} from '../../types/WithStyles';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  typography: {
    color: theme.palette.grey[300],
    fontSize: theme.typography.pxToRem(12),
  },
});
const useStyles = makeStyles(styles);

export const PlainLayoutFooter: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <Box alignItems="center" justifyContent="center" display="flex" mt={4}>
      <Typography classes={{root: styles.typography}}>
        {t('All rights reserved to')}
        <strong> byoT</strong>
      </Typography>
    </Box>
  );
};
