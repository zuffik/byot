import * as React from 'react';
import {Box, Grid, IconButton, InputBase, makeStyles, Theme, useTheme} from '@material-ui/core';
import {Menu, Search} from '@material-ui/icons';
import {useTranslation} from 'react-i18next';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Logo} from '@byot-frontend/web-common/src/components/elementary/logo/Logo';
import {UserAvatarDropdown} from '../user/UserAvatarDropdown';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    position: 'fixed' as 'fixed',
    left: 0,
    top: 0,
    width: '100%',
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelHeader: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <Grid container classes={{root: styles.root}} alignItems="center">
      <Grid item>
        <Box py={1} px={2}>
          <IconButton>
            <Menu />
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <Box py={1} px={2} display="flex" flexDirection="row" alignItems="center">
          <Search />
          <InputBase placeholder={t('Type in to search...')} />
        </Box>
      </Grid>
      <Grid item md>
        <Box py={1} px={2} textAlign="center">
          <Logo height={theme.spacing(4)} />
        </Box>
      </Grid>
      <Grid item>
        <UserAvatarDropdown />
      </Grid>
    </Grid>
  );
};
