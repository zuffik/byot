import * as React from 'react';
import {makeStyles, Theme, Typography} from '@material-ui/core';
import {SentimentDissatisfiedRounded} from '@material-ui/icons';
import {WithStyles} from '../../../types/WithStyles';
import {useTranslation} from 'react-i18next';
import {CSSProperties} from '@material-ui/styles';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: theme.palette.grey[400],
    padding: theme.spacing(2),
    width: '100%',
  } as CSSProperties,
  icon: {
    fontSize: theme.typography.pxToRem(theme.spacing(7)),
  },
  title: {
    fontSize: theme.typography.pxToRem(theme.spacing(3)),
  },
});
const useStyles = makeStyles(styles);

export const EmptyListInfo: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <div className={styles.root}>
      <SentimentDissatisfiedRounded classes={{root: styles.icon}} />
      <Typography classes={{root: styles.title}}>{t('Nothing found')}</Typography>
    </div>
  );
};
