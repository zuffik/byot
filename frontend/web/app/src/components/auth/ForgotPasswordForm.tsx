import * as React from 'react';
import {Form, Formik} from 'formik';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {PlainLayoutNarrow} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutNarrow';
import {PlainLayoutTitle} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutTitle';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {Box, Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {requestResetPasswordSchema} from '@byot-frontend/common/src/types/schemas/validation/RequestResetPasswordSchema';

interface Props {
  onSubmit: (email: string) => void;
  loading?: boolean;
  overTitle?: React.ReactNode;
}

export const ForgotPasswordForm: React.FC<Props> = (props: Props) => {
  const initialValues = {email: ''};
  const {t} = useTranslation();
  return (
    <PlainLayoutNarrow>
      {props.overTitle && <Box mb={2}>{props.overTitle}</Box>}
      <PlainLayoutTitle>{t('Reset password')}</PlainLayoutTitle>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange
        validationSchema={requestResetPasswordSchema(t)}
        onSubmit={({email}) => props.onSubmit(email)}>
        {({values, handleChange, handleBlur, errors, touched}) => (
          <Form data-testid="common-auth-forgotPassword-form-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  data-testid="common-auth-forgotPassword-form-email"
                  label={t('Enter email')}
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth loading={props.loading}>
                  {t('Request reset password')}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PlainLayoutNarrow>
  );
};
