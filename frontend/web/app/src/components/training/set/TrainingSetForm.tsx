import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {FastField, Form, Formik} from 'formik';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {TFunction} from 'i18next';
import * as Yup from 'yup';
import {ITrainingSetInput} from '@byot-frontend/common/src/types/interfaces/ITrainingSetInput';
import {TrainingSetInput} from '@byot-frontend/common/src/types/dto/TrainingSetInput';

const trainingSetSchema = (t: TFunction) =>
  Yup.object().shape({
    label: Yup.string().required(t('Enter training set name')),
  });

interface Props {
  trainingSet?: ITrainingSet;
  onSave: (trainingSet: ITrainingSetInput) => void;
  isLoading?: boolean;
}

export const TrainingSetForm: React.FC<Props> = (props: Props) => {
  const editing = !!props.trainingSet;
  const trainingSet: ITrainingSetInput = new TrainingSetInput(editing ? props.trainingSet! : undefined);
  const {t} = useTranslation();
  return (
    <Formik
      initialValues={trainingSet}
      onSubmit={props.onSave}
      validationSchema={trainingSetSchema(t)}
      validateOnBlur
      validateOnChange>
      {({errors, touched}) => (
        <Form data-testid="training-set-form-form">
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12}>
              <FastField
                as={Input}
                data-testid="training-set-form-label"
                name="label"
                label={t('Enter training set name')}
                error={touched.label && errors.label}
                helperText={errors.label}
              />
            </Grid>
            <Grid item>
              <Button color="primary" type="submit" loading={props.isLoading}>
                {t('Save training set')}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
