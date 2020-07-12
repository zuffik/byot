import * as React from 'react';
import {makeStyles, Theme, Typography, TypographyProps} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

interface Props extends WithStyles<typeof styles>, TypographyProps {}

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(styles);

export const DateTimeTypography: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <Typography variant="caption" {...props} classes={{...props.classes, root: styles.root}}>
      {props.children}
    </Typography>
  );
};
