import * as React from 'react';
import {Form, Formik} from 'formik';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {TFunction} from 'i18next';
import * as Yup from 'yup';
import {PlainLayoutNarrow} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutNarrow';
import {PlainLayoutTitle} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayoutTitle';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {Box} from '@material-ui/core';
import {useTranslation} from '@byot-frontend/common/src/i18n/UseTranslation';

const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t('Enter email')).email(t('Enter valid email')),
  });

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
        validationSchema={loginSchema(t)}
        onSubmit={({email}) => props.onSubmit(email)}>
        {({values, handleChange, handleBlur, errors, touched}) => (
          <Form data-testid="common-auth-forgotPassword-form-form">
            <Input
              data-testid="common-auth-forgotPassword-form-email"
              label={t('Enter email')}
              errorText={touched.email && errors.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />

            <Button type="submit" color="gradient" fullWidth loading={props.loading}>
              {t('Request reset password')}
            </Button>
          </Form>
        )}
      </Formik>
    </PlainLayoutNarrow>
  );
};
