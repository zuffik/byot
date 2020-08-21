import * as React from 'react';
import {Formik} from 'formik';
import {UserRegister} from '@byot-frontend/common/src/types/dto/UserRegister';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {Checkbox, CheckboxPropTypes, Colors, Text, View} from 'react-native-ui-lib';
import {registrationSchema} from '@byot-frontend/common/src/types/schemas/validation/RegistrationSchema';
import {IdView} from '../../elements/semantical/IdView';
import {TextField} from '../../elements/lib/TextField';
import {Button} from '../../elements/lib/Button';

interface Props {
  onRegister: (values: IUserRegister) => void;
  loading?: boolean;
  children?: React.ReactNode;
}

const useStyles = (props: Props) =>
  StyleSheet.create({
    checkbox: {
      fontWeight: '300',
      fontSize: 13,
    },
    rowGrid: {
      flexDirection: 'row',
    },
    rowGridItem: {
      width: '50%',
    },
  });

export const testIDs = {
  root: 'registrationForm-root',
  firstName: 'registrationForm-firstName',
  lastName: 'registrationForm-lastName',
  email: 'registrationForm-email',
  password: 'registrationForm-password',
  passwordRepeat: 'registrationForm-passwordRepeat',
  consent: 'registrationForm-consent',
  submit: 'registrationForm-submit',
};

export const RegistrationForm: React.FC<Props> = (props: Props) => {
  const initialValues: IUserRegister & {consent: boolean; passwordRepeat: string} = {
    ...new UserRegister(),
    consent: false,
    passwordRepeat: '',
  };
  const styles = useStyles(props);
  const checkbox = React.useRef<React.ComponentType<CheckboxPropTypes> & {onPress: () => void}>();
  const {t} = useTranslation();
  const [password, setPassword] = React.useState(initialValues.password);

  return (
    <>
      <View paddingB-20>
        <Text heading>{t('Sign up')}</Text>
      </View>
      <ScrollView horizontal={false}>
        <IdView testID={testIDs.root}>
          <Formik
            onSubmit={values => props.onRegister(new UserRegister(values))}
            validateOnChange
            validateOnBlur
            validationSchema={registrationSchema(t, password)}
            initialValues={initialValues}>
            {({values, touched, errors, handleChange, handleBlur, setFieldValue, handleSubmit}) => (
              <>
                <View style={styles.rowGrid}>
                  <View style={styles.rowGridItem} paddingR-8>
                    <TextField
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      testID={testIDs.firstName}
                      accessibilityLabel={testIDs.firstName}
                      onBlur={handleBlur('firstName')}
                      placeholder={t('First name')}
                    />
                  </View>
                  <View style={styles.rowGridItem} paddingL-8>
                    <TextField
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      testID={testIDs.lastName}
                      accessibilityLabel={testIDs.lastName}
                      onBlur={handleBlur('lastName')}
                      placeholder={t('Last name')}
                    />
                  </View>
                </View>
                <View marginB-10>
                  <TextField
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={values.email}
                    error={(touched.email && errors.email) as string}
                    onChangeText={handleChange('email')}
                    testID={testIDs.email}
                    accessibilityLabel={testIDs.email}
                    onBlur={handleBlur('email')}
                    placeholder={t('Email')}
                  />
                </View>
                <View marginB-10>
                  <TextField
                    secureTextEntry
                    autoCapitalize="none"
                    value={values.password}
                    error={(touched.password && errors.password) as string}
                    onChangeText={(value: string) => {
                      handleChange('password')(value);
                      setPassword(value);
                    }}
                    onBlur={handleBlur('password')}
                    testID={testIDs.password}
                    placeholder={t('Password')}
                  />
                </View>
                <View marginB-10>
                  <TextField
                    secureTextEntry
                    autoCapitalize="none"
                    value={values.passwordRepeat}
                    error={(touched.passwordRepeat && errors.passwordRepeat) as string}
                    onChangeText={handleChange('passwordRepeat')}
                    onBlur={handleBlur('passwordRepeat')}
                    testID={testIDs.passwordRepeat}
                    accessibilityLabel={testIDs.passwordRepeat}
                    placeholder={t('Confirm password')}
                  />
                </View>
                <View marginB-10>
                  <View style={styles.rowGrid}>
                    <View marginR-8>
                      <Checkbox
                        ref={checkbox as any}
                        color={Colors.primary}
                        onValueChange={value => setFieldValue('consent', value)}
                        value={values.consent}
                        testID={testIDs.consent}
                        accessibilityLabel={testIDs.consent}
                      />
                    </View>
                    <Text onPress={() => checkbox.current?.onPress()}>
                      {t('I allow this website to collect and store submitted data.')}
                    </Text>
                  </View>
                  {errors.consent && (
                    <Text error marginT-10>
                      {errors.consent}
                    </Text>
                  )}
                </View>
                <View marginT-10>
                  <Button
                    loading={props.loading}
                    testID={testIDs.submit}
                    onPress={handleSubmit}
                    label={t('Sign up')}
                  />
                </View>
                {props.children}
              </>
            )}
          </Formik>
        </IdView>
      </ScrollView>
    </>
  );
};
