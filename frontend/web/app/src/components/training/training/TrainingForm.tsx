import * as React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {FastField, Form, Formik} from 'formik';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {TFunction} from 'i18next';
import * as Yup from 'yup';
import {MediaList} from '../../media/list/MediaList';
import {TrainingDraftInput} from '@byot-frontend/common/src/types/dto/TrainingDraftInput';
import {ITrainingDraftInput} from '@byot-frontend/common/src/types/interfaces/ITrainingDraftInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {ButtonRemove} from '../../elements/button/ButtonRemove';

const trainingSchema = (t: TFunction) =>
  Yup.object().shape({
    label: Yup.string().required(t('Enter training name')),
  });

type EditProps = {
  training: ITraining;
  onRemove: () => void;
};

type CreateProps = {
  trainingSetId: string;
};

type Props = {
  onSave: (training: ITrainingDraftInput) => void;
  MediaProviderComponent: React.ComponentType<{handleMediaFound: (media: IMedia) => void}>;
} & (CreateProps | EditProps);

const isEditProps = (props: Props | any): props is EditProps => 'training' in props;

export const TrainingForm: React.FC<Props> = (props: Props) => {
  const training = new TrainingDraftInput(
    isEditProps(props)
      ? {label: props.training.label, idTrainingSet: props.training.trainingSet.id}
      : {idTrainingSet: props.trainingSetId}
  );
  const [media, setMedia] = React.useState<IMedia[]>(isEditProps(props) ? props.training.media.entries : []);
  const {t} = useTranslation();
  const addMedia = (m: IMedia) => setMedia([...media, m]);
  const onSubmit = (values: ITrainingDraftInput) => {
    values.media = media.map(m => ({
      id: m.source.resourceId!,
      label: m.label,
      sourceType: m.source.sourceType,
    }));
    props.onSave(values);
  };
  return (
    <Formik
      initialValues={training}
      onSubmit={onSubmit}
      validationSchema={trainingSchema(t)}
      validateOnBlur
      validateOnChange>
      {({errors, touched}) => (
        <Form data-testid="training-form-form">
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12}>
              <FastField
                as={Input}
                data-testid="training-form-name"
                name="label"
                label={t('Enter training name')}
                error={!!(touched.label && errors.label)}
                helperText={errors.label}
              />
            </Grid>
            <Grid item xs={12}>
              <MediaList
                editable
                items={media}
                onOrderChanged={setMedia}
                onRemoveMedia={m => setMedia(media.filter(media => media.id != m.id))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">{t('Add video')}</Typography>
              <props.MediaProviderComponent handleMediaFound={addMedia} />
            </Grid>
            <Grid item>
              <Button color="primary" type="submit">
                {t('Save training')}
              </Button>
              {isEditProps(props) && (
                <ButtonRemove onClick={props.onRemove} data-testid="training-form-button-remove" />
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
