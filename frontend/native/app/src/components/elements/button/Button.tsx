import * as React from 'react';
import {Button as Btn, ButtonProps} from '@ui-kitten/components/ui/button/button.component';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {baseTheme} from '../../../setup';

interface Props extends Omit<ButtonProps, 'status'> {
  color?: ButtonProps['status'] | 'gradient' | 'secondary';
}

interface State {
  touched: boolean;
}

const makeStyles = (props: Props, state: State) => {
  const shadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 32,
  };
  return StyleSheet.create({
    button: {
      ...((props.appearance || 'filled') === 'filled' && shadow),
    },
    gradientButton: {
      backgroundColor: '#00000000',
      borderWidth: 0,
    },
    buttonWrapper: {
      opacity: state.touched ? 0.8 : 1,
      ...((props.appearance || 'filled') === 'filled' && shadow),
    },
    gradient: {
      borderRadius: 32,
    },
  });
};

export const Button: React.FC<Props> = (props: Props) => {
  const [touched, setTouched] = React.useState<State['touched']>(false);
  const styles = makeStyles(props, {touched});
  const testID = 'element-button';

  return props.color !== 'gradient' ? (
    <Btn {...props} style={[props.style, styles.button]} accessibilityLabel={testID} testID={testID}>
      {props.children}
    </Btn>
  ) : (
    <View
      style={styles.buttonWrapper}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}>
      <LinearGradient
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[baseTheme.colors.gradient.start.color, baseTheme.colors.gradient.end.color]}>
        <Btn
          {...props}
          style={[props.style, styles.gradientButton]}
          accessibilityLabel={testID}
          testID={testID}>
          {props.children}
        </Btn>
      </LinearGradient>
    </View>
  );
};
