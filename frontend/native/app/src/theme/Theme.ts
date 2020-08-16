import {Colors, Spacings, ThemeManager, Typography} from 'react-native-ui-lib';
import {default as baseTheme} from '@byot/common/theme/theme';
import {Platform} from 'react-native';

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

  const defaultTypography = (androidFontSuffix: string = 'Regular') => ({
    fontFamily: Platform.OS == 'ios' ? 'Nunito' : `Nunito-${androidFontSuffix}`,
    color: Colors.text,
  });

  Typography.loadTypographies({
    heading: {
      ...defaultTypography('Black'),
      fontSize: 36,
      fontWeight: '800',
      marginBottom: 30,
    },
    subheading: {...defaultTypography(), fontSize: 28, fontWeight: '500'},
    body: {...defaultTypography(), fontSize: 18, fontWeight: '400'},
    defaultTypography: defaultTypography(),
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
      fontFamily: Platform.OS == 'ios' ? 'Nunito' : 'Nunito-SemiBold',
    },
  }));

  ThemeManager.setComponentTheme('Text', {
    defaultTypography: true,
  });

  ThemeManager.setComponentTheme('TextField', {
    floatingPlaceholderStyle: {
      fontFamily: Platform.OS == 'ios' ? 'Nunito' : 'Nunito-Regular',
    },
  });
};
