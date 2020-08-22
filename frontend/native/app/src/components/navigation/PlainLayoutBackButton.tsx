import * as React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardArrowLeft} from '../icons/material/KeyboardArrowLeft';
import {Colors} from 'react-native-ui-lib';

interface Props {
  onPress: () => void;
  visible?: boolean;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    icon: {
      color: Colors.primary,
      fontSize: 48,
    },
  });

export const PlainLayoutBackButton: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const fade = React.useRef(new Animated.Value(props.visible ? 1 : 0)).current;
  const fadeIn = () =>
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

  const fadeOut = () =>
    Animated.timing(fade, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  React.useEffect(() => {
    if (props.visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [props.visible]);
  return (
    <Animated.View style={[styles.root, {opacity: fade}]}>
      <TouchableOpacity onPress={props.onPress}>
        <KeyboardArrowLeft style={styles.icon} />
      </TouchableOpacity>
    </Animated.View>
  );
};
