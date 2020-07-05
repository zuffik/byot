import * as React from 'react';
import {Image, ImageProps, LayoutRectangle, StyleSheet} from 'react-native';
import {Constants} from '../../../types/Constants';

interface Props extends Omit<ImageProps, 'source'> {
  size?: number;
}

interface State {
  width: number;
  height: number;
}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      resizeMode: 'contain',
      width: state.width,
      height: state.height,
    },
  });

export const Logo: React.FC<Props> = (props: Props) => {
  const height = props.size || 100;
  const realWidth = Constants.LOGO_SIZE.width || 0;
  const realHeight = Constants.LOGO_SIZE.height || 1;
  const width = (realWidth * height) / realHeight;
  const styles = makeStyles(props, {width, height});
  return (
    <Image
      source={require('./../../../assets/byoT-full.png')}
      {...props}
      style={[props.style, styles.root]}
    />
  );
};
