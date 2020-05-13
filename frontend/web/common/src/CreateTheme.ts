import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core';
import * as _ from 'lodash';
import theme from '@byot-frontend/common/src/shared/theme/theme';

export const createTheme = <T extends ThemeOptions>(options?: T) => (): Theme =>
  createMuiTheme(
    _.merge(
      {},
      {
        typography: {
          fontFamily: 'rubik, sans-serif',
        },
        palette: {
          primary: {
            main: theme.colors.primary,
          },
          secondary: {
            main: theme.colors.secondary,
          },
          dark: {
            main: theme.colors.dark,
          },
          light: {
            main: theme.colors.light,
          },
          gradient: theme.colors.gradient,
        },
      } as ThemeOptions,
      options
    )
  );
