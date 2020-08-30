import * as React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {IResetPassword} from '@byot-frontend/common/src/types/interfaces/IResetPassword';
import {ResetPassword} from '@byot-frontend/common/src/types/dto/ResetPassword';
import {resetPasswordSchema} from '@byot-frontend/common/src/types/schemas/validation/ResetPasswordSchema';
import {TextField} from '../../elements/lib/TextField';
import {Button} from '../../elements/lib/Button';

export const testIDs = {
  newPassword: 'resetPassword-newPassword',
  passwordRepeat: 'resetPassword-passwordRepeat',
  submit: 'resetPassword-submit',
};

interface Props {
  loading: boolean;
  onSubmit: (values: IResetPassword) => void;
  token: string;
}

export const ResetPasswordForm: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  const [password, setPassword] = React.useState('');
  const initialValues: IResetPassword = new ResetPassword({token: props.token});
  return (
    <>
      <Text heading>{t('Reset password')}</Text>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange
        validationSchema={resetPasswordSchema(t, password)}
        onSubmit={values => props.onSubmit(values)}>
        {({values, handleChange, handleSubmit, handleBlur, errors, touched}) => (
          <>
            <View marginB-10>
              <TextField
                placeholder={t('Enter new password')}
                value={values.newPassword}
                secureTextEntry
                onBlur={handleBlur('newPassword')}
                onChangeText={text => {
                  setPassword(text);
                  handleChange('newPassword')(text);
                }}
                infoText
                error={(touched.newPassword && errors.newPassword) as string}
                testID={testIDs.newPassword}
                accessibilityLabel={testIDs.newPassword}
                autoCapitalize="none"
              />
            </View>
            <View marginB-10>
              <TextField
                placeholder={t('Confirm password')}
                value={values.passwordRepeat}
                secureTextEntry
                onBlur={handleBlur('passwordRepeat')}
                onChangeText={handleChange('passwordRepeat')}
                infoText
                error={(touched.passwordRepeat && errors.passwordRepeat) as string}
                testID={testIDs.passwordRepeat}
                accessibilityLabel={testIDs.passwordRepeat}
                autoCapitalize="none"
              />
            </View>
            <View marginB-10>
              <Button
                label={t('Reset password')}
                testID={testIDs.submit}
                onPress={handleSubmit}
                loading={props.loading}
              />
            </View>
          </>
        )}
      </Formik>
    </>
  );
};
