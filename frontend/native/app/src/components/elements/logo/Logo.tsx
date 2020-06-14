import * as React from 'react';
import {Image, ImageProps, LayoutRectangle, StyleSheet} from 'react-native';

interface Props extends Omit<ImageProps, 'source'> {
  size?: number;
}

interface State {
  loaded: boolean;
}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      resizeMode: 'contain',
      ...(!state.loaded && {
        opacity: 0,
        position: 'absolute',
      }),
    },
  });

export const Logo: React.FC<Props> = (props: Props) => {
  const [layout, setLayout] = React.useState<LayoutRectangle | undefined>(undefined);
  const height = props.size || 100;
  const realWidth = layout?.width || 0;
  const realHeight = layout?.height || 1;
  const width = (realWidth * height) / realHeight;
  const styles = makeStyles(props, {loaded: !!layout});
  return (
    <Image
      source={require('./../../../assets/byoT-full.png')}
      {...props}
      onLayout={l => setLayout(l.nativeEvent.layout)}
      style={[props.style, styles.root]}
      {...(!!layout && {width, height})}
    />
  );
};
