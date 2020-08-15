import * as React from 'react';
import {Colors, Text, TextField as TextFieldBase} from 'react-native-ui-lib';
import {Patch, PatchProps} from '../patch/Patch';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

type Props = TextInputProps & {
  color?: 'primary' | 'secondary';
  infoText?: boolean;
  success?: string;
  error?: string;
  PatchProps?: Partial<PatchProps>;
};

const makeStyles = (props: Props) =>
  StyleSheet.create({
    input: {
      marginTop: -4,
      marginBottom: 4,
    },
    placeholder: {
      ...(props.error && {color: Colors.error}),
      ...(props.success && {color: Colors.success}),
      ...(typeof props.editable != 'undefined' && !props.editable && {color: Colors.grey50}),
    },
    infoText: {
      paddingLeft: 12,
      marginTop: 2,
      fontSize: 12,
    },
  });

export const TextField: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props);
  const input = React.useRef<TextInput>();
  const color = props.color || 'primary';
  const infoText = typeof props.infoText == 'undefined' ? true : props.infoText;
  const onPress = () => input.current?.focus();
  return (
    <>
      <Patch
        paddingB-8
        paddingT-8
        paddingL-12
        paddingR-12
        activeOpacity={1}
        {...props.PatchProps}
        onPress={onPress}>
        <TextFieldBase
          enableErrors={false}
          ref={input}
          hideUnderline
          floatOnFocus
          floatingPlaceholder
          floatingPlaceholderColor={{
            error: Colors.error,
            focus: Colors[color],
            default: props.error ? Colors.error : Colors.grey30,
          }}
          {...props}
          color={Colors.text}
          style={[props.style, styles.input]}
          floatingPlaceholderStyle={styles.placeholder}
        />
      </Patch>
      <Text error={!!props.error} success={!!props.success} style={styles.infoText}>
        {infoText && (props.error || props.success || ' ')}
      </Text>
    </>
  );
};
