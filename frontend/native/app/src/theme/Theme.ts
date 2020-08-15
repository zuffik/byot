import {Colors, Spacings, ThemeManager, Typography} from 'react-native-ui-lib';
import {default as baseTheme} from '@byot/common/theme/theme';

export const loadTheme = (dark: boolean) => {
  Colors.loadColors({
    primary: baseTheme.colors.primary,
    secondary: baseTheme.colors.secondary,
    error: '#f44336',
    success: '#569131',
    warn: '#FF963C',

    mainBackground: dark ? baseTheme.colors.dark : '#fff',
    background: baseTheme.colors[dark ? 'dark' : 'light'],
    text: baseTheme.colors[dark ? 'light' : 'dark'],

    g10: 'rgba(0, 0, 0, 0.05)',
  });

  const defaultTypography = {fontFamily: 'Nunito', color: Colors.text};

  Typography.loadTypographies({
    heading: {
      ...defaultTypography,
      fontSize: 36,
      fontWeight: '800',
      marginBottom: 30,
    },
    subheading: {...defaultTypography, fontSize: 28, fontWeight: '500'},
    body: {...defaultTypography, fontSize: 18, fontWeight: '400'},
    defaultTypography,
  });

  Spacings.loadSpacings({
    page: 20,
    card: 12,
    gridGutter: 16,
  });

  ThemeManager.setComponentTheme('Card', {
    borderRadius: 8,
  });

  ThemeManager.setComponentTheme('Button', (props: {variant: string; link: boolean}) => ({
    borderRadius: 12,
    [props.link ? 'color' : 'backgroundColor']: Colors[props.variant || 'primary'],
    'paddingT-10': true,
    'paddingB-10': true,
    labelStyle: {
      fontWeight: '500',
      fontFamily: 'Nunito',
    },
  }));

  ThemeManager.setComponentTheme('Text', {
    defaultTypography: true,
  });
};
