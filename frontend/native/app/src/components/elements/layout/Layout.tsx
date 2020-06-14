import * as React from 'react';
import {styled, Layout as BaseLayout, LayoutProps} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {baseTheme} from '../../../setup';

interface Props extends LayoutProps {}

const makeStyles = (props: Props) =>
  StyleSheet.create({
    root: {
      backgroundColor: baseTheme.colors.light,
    },
  });

export const Layout: React.FC<Props> = styled('Layout')((props: Props) => {
  const styles = makeStyles(props);
  return <BaseLayout {...props} style={[props.style, styles.root]} />;
});
