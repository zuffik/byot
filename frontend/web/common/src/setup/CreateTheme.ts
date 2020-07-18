import {createMuiTheme, Theme, ThemeOptions} from '@material-ui/core';
import merge from 'deepmerge';
import theme from '@byot-frontend/common/src/shared/theme/theme';

const spacing = 8;
const white = '#ffffff';

export const createTheme = <T extends ThemeOptions>(options?: T): Theme =>
  createMuiTheme(
    merge(
      {
        shape: {
          borderRadius: spacing * 1.5,
        },
        spacing,
        typography: {
          fontFamily: 'nunito, sans-serif',
          h1: {
            fontWeight: 700,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
          h2: {
            fontWeight: 800,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
          h3: {
            fontWeight: 800,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
          h4: {
            fontWeight: 800,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
          h5: {
            fontWeight: 700,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
          h6: {
            fontWeight: 700,
            color: options?.palette?.type === 'dark' ? white : theme.colors.dark,
          },
        },
        palette: {
          background: {
            default: options?.palette?.type === 'dark' ? '#203045' : white,
            paper: options?.palette?.type === 'dark' ? theme.colors.dark : '#F8F9F8',
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
          grey: {
            [100]: '#F8F9F8',
            [300]: '#E5E5E5',
            [400]: '#D0D0D2',
            [900]: theme.colors.dark,
          },
        },
        overrides: {
          MuiListItemIcon: {
            root: {
              minWidth: 40,
            },
          },
          MuiListItem: {
            container: {
              listStyle: 'none',
            },
          },
        },
      } as ThemeOptions,
      options || {}
    )
  );
