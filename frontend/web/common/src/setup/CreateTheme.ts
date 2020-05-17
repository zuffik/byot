import {createMuiTheme, Theme, ThemeOptions} from '@material-ui/core';
import * as _ from 'lodash';
import theme from '@byot-frontend/common/src/shared/theme/theme';

const spacing = 8;

export const createTheme = <T extends ThemeOptions>(options?: T): Theme =>
  createMuiTheme(
    _.merge(
      {},
      {
        shape: {
          borderRadius: 20,
        },
        spacing,
        typography: {
          fontFamily: 'rubik, sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 800,
          },
          h3: {
            fontWeight: 800,
          },
          h4: {
            fontWeight: 800,
          },
          h5: {
            fontWeight: 700,
          },
          h6: {
            fontWeight: 700,
          },
        },
        palette: {
          background: {
            default: '#fff',
          },
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
          common: {
            black: theme.colors.dark,
            white: theme.colors.light,
          },
          gradient: theme.colors.gradient,
        },
      } as ThemeOptions,
      options
    )
  );
