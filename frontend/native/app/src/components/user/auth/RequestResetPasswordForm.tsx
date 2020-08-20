import * as React from 'react';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {requestResetPasswordSchema} from '@byot-frontend/common/src/types/schemas/validation/RequestResetPasswordSchema';
import {Text, View} from 'react-native-ui-lib';
import {TextField} from '@byot-frontend/native-app/src/components/elements/lib/TextField';
import {Button} from '../../elements/lib/Button';

export const testIDs = {
  email: 'requestResetPasswordForm-email-input',
};

interface Props {
  loading?: boolean;
  onSubmit: (email: string) => void;
}

export const RequestResetPasswordForm: React.FC<Props> = (props: Props) => {
  const initialValues = {email: ''};
  const {t} = useTranslation();
  return (
    <>
      <Text heading>{t('Login')!}</Text>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange
        validationSchema={requestResetPasswordSchema(t)}
        onSubmit={({email}) => props.onSubmit(email)}>
        {({values, handleSubmit, handleChange, handleBlur, errors, touched}) => (
          <>
            <View marginB-4>
              <TextField
                placeholder={t('Enter email')}
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                infoText
                error={(touched.email && errors.email) as string}
                testID={testIDs.email}
                accessibilityLabel={testIDs.email}
                autoCapitalize="none"
              />
            </View>
            <Button loading={props.loading} onPress={handleSubmit} label={t('Request reset password')} />
          </>
        )}
      </Formik>
    </>
  );
};
