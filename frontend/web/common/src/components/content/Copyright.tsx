import * as React from 'react';
import {makeStyles, Theme, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {WithStyles} from '../../types/WithStyles';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  typography: {
    color: theme.palette.grey[300],
    fontSize: theme.typography.pxToRem(12),
  },
});
const useStyles = makeStyles(styles);

export const Copyright: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <Typography classes={{root: styles.typography}}>
      {t('All rights reserved to')}
      <strong> byoT</strong>
    </Typography>
  );
};
