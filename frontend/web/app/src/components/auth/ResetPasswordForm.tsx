import * as React from 'react';
import {Grid} from '@material-ui/core';
import {Form, Formik} from 'formik';
import {PlainLayoutNarrow} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutNarrow';
import {PlainLayoutTitle} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutTitle';
import {useTranslation} from 'react-i18next';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {IResetPassword} from '@byot-frontend/common/src/types/interfaces/IResetPassword';
import {ResetPassword} from '@byot-frontend/common/src/types/dto/ResetPassword';
import {resetPasswordSchema} from '@byot-frontend/common/src/types/schemas/validation/ResetPasswordSchema';

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
    <PlainLayoutNarrow>
      <PlainLayoutTitle>{t('Reset password')}</PlainLayoutTitle>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange
        validationSchema={resetPasswordSchema(t, password)}
        onSubmit={values => props.onSubmit(values)}>
        {({values, handleChange, handleBlur, errors, touched}) => (
          <Form data-testid="common-auth-resetPassword-form-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  data-testid="common-auth-resetPassword-form-newPassword"
                  label={t('Enter new password')}
                  error={!!(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  onChange={e => {
                    setPassword(e.target.value);
                    handleChange('newPassword')(e);
                  }}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  data-testid="common-auth-resetPassword-form-passwordRepeat"
                  label={t('Confirm password')}
                  error={!!(touched.passwordRepeat && errors.passwordRepeat)}
                  helperText={touched.passwordRepeat && errors.passwordRepeat}
                  onChange={handleChange('passwordRepeat')}
                  onBlur={handleBlur('passwordRepeat')}
                  value={values.passwordRepeat}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth loading={props.loading}>
                  {t('Reset password')}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PlainLayoutNarrow>
  );
};
