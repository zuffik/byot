import * as React from 'react';
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {Text} from '@ui-kitten/components/ui/text/text.component';
import {hexToRgb} from '@byot-frontend/common/src/data-manipulation/Colors';
import {baseTheme, Theme} from '../../../setup';
import {useTheme} from '@ui-kitten/components';

interface Props extends TextInputProps {
  labelAnimationDuration?: number;
  color?: 'primary' | 'secondary';
  withHelperText?: boolean | 'danger' | 'success' | 'info';
  helperText?: string;
}

interface State {
  focused: boolean;
  transitionState: Animated.Value;
  value: string;
}

const makeStyles = (theme: Theme, props: Props, state: State) =>
  StyleSheet.create({
    root: {
      marginBottom: 5,
    },
    helper: {
      fontSize: 12,
      color: !props.withHelperText
        ? props.placeholderTextColor || theme['text-hint-color']
        : theme[`text-${props.withHelperText}-color`],
    },
    textInputWrapper: {
      borderStyle: 'solid',
    },
    textInput: {
      padding: 0,
      height: 20,
    },
  });

export const TextField: React.FC<Props> = (props: Props) => {
  const theme = useTheme() as Theme;
  const defaultAnimationDuration = 100;
  const inputRef = React.useRef<TextInput>(null);
  const [focused, setFocused] = React.useState<State['focused']>(false);
  const [value, setValue] = React.useState<State['value']>(props.defaultValue || '');
  const transitionState = React.useRef<Animated.Value>(new Animated.Value(1)).current;
  const colorChangeState = React.useRef<Animated.Value>(new Animated.Value(1)).current;
  const placeholderColor = props.placeholderTextColor || theme['text-hint-color'];
  const color = props.color || 'primary';

  const styles = makeStyles(theme, props, {focused, transitionState, value});

  const startAnimation = (toValue: 0 | 1, withTransition: boolean = true) => {
    if (withTransition) {
      Animated.timing(transitionState, {
        toValue,
        duration: props.labelAnimationDuration || defaultAnimationDuration,
        useNativeDriver: false,
        easing: Easing.cubic,
      }).start();
    }
    Animated.timing(colorChangeState, {
      toValue,
      duration: props.labelAnimationDuration || defaultAnimationDuration,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start();
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    startAnimation(0);
    props.onFocus?.(e);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    startAnimation(1, value.trim() === '');
    props.onBlur?.(e);
  };

  const onChangeText = (text: string) => {
    setValue(text);
    props.onChangeText?.(text);
  };

  const onLabelPress = () => {
    inputRef.current?.focus();
  };

  const colorChangeInterpolation = colorChangeState.interpolate({
    inputRange: [0, 1],
    outputRange: [hexToRgb(baseTheme.colors[color]), hexToRgb(placeholderColor)],
  });
  const {color: c, ...rest} = props;

  return (
    <View style={[styles.root, props.style]}>
      <Animated.View
        style={{
          transform: [{translateY: Animated.multiply(transitionState, 16)}],
          paddingTop: Animated.subtract(4, Animated.multiply(transitionState, 4)),
        }}>
        <Text onPress={onLabelPress}>
          <Animated.Text
            style={{
              fontSize: Animated.add(14, Animated.multiply(transitionState, 2)),
              color: colorChangeInterpolation,
            }}>
            {props.placeholder}
          </Animated.Text>
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.textInputWrapper,
          borderBottomColor: colorChangeInterpolation,
          borderBottomWidth: Animated.subtract(2, colorChangeState),
        }}>
        <TextInput
          {...rest}
          style={styles.textInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={undefined}
          ref={inputRef}
        />
      </Animated.View>
      {props.withHelperText || props.helperText ? (
        <Text style={styles.helper}>{props.helperText || ' '}</Text>
      ) : null}
    </View>
  );
};
