import * as React from 'react';
import {makeStyles, Button, Theme, Typography} from '@material-ui/core';
import {KeyboardBackspace} from '@material-ui/icons';
import {useTranslation} from '@byot-frontend/common/src/i18n/UseTranslation';
import {WithStyles} from '../../../types/WithStyles';
import {useHistory} from 'react-router';

interface Props extends WithStyles<typeof styles> {
  color?: 'primary' | 'secondary';
  onClick?: () => void;
}

const styles = (theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    padding: 0,
    paddingRight: theme.spacing(1 / 2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  label: {
    textTransform: 'none',
  },
});
const useStyles = makeStyles(styles);

export const BackButton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const color = props.color || 'primary';
  const {t} = useTranslation();
  return (
    <Button classes={{root: styles.root}} onClick={props.onClick} color={color}>
      <KeyboardBackspace color={color} classes={{root: styles.icon}} />
      <Typography color={color} classes={{root: styles.label}}>
        {t('Back')}
      </Typography>
    </Button>
  );
};

export const RouterBackButton: React.FC<Props> = (props: Omit<Props, 'onClick'>) => {
  const history = useHistory();
  const onClick = () => history.goBack();

  return <BackButton {...props} onClick={onClick} />;
};
