import * as React from 'react';
import {Typography} from '@material-ui/core';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {FastField, Form, Formik} from 'formik';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {MediaList} from '../../media/list/MediaList';
import {TrainingDraftInput} from '@byot-frontend/common/src/types/dto/TrainingDraftInput';
import {ITrainingDraftInput} from '@byot-frontend/common/src/types/interfaces/ITrainingDraftInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {FormHelperText} from '@byot-frontend/web-common/src/components/elementary/form/FormHelperText';
import {TrainingFormWireframe} from './TrainingFormWireframe';
import {trainingSchema, trainingValidation} from '../../../services/validation/TrainingValidation';
import {ITrainingUpdateInput} from '@byot-frontend/common/src/types/interfaces/ITrainingUpdateInput';
import {TrainingUpdateInput} from '@byot-frontend/common/src/types/dto/TrainingUpdateInput';

type EditProps = {
  onSave: (training: ITrainingUpdateInput) => void;
  training: ITraining;
};

type CreateProps = {
  onSave: (training: ITrainingDraftInput) => void;
  trainingSetId: string;
};

type Props = {
  MediaProviderComponent: React.ComponentType<{handleMediaFound: (media: IMedia) => void}>;
  isLoading?: boolean;
} & (CreateProps | EditProps);

const isEditProps = (props: Props | any): props is EditProps => 'training' in props;

export const TrainingForm: React.FC<Props> = (props: Props) => {
  const training = isEditProps(props)
    ? new TrainingUpdateInput({label: props.training.label})
    : new TrainingDraftInput({idTrainingSet: props.trainingSetId});
  const [media, setMedia] = React.useState<IMedia[]>(isEditProps(props) ? props.training.media.entries : []);
  const {t} = useTranslation();
  const addMedia = (m: IMedia) => setMedia([...media, m]);
  const onSubmit = (values: ITrainingDraftInput & ITrainingUpdateInput) => {
    values.media = media.map(m => ({
      id: m.source.resourceId!,
      label: m.label,
      sourceType: m.source.sourceType,
    }));
    props.onSave(values);
  };
  const schema = trainingSchema(t, !isEditProps(props));
  return (
    <Formik
      initialValues={training}
      onSubmit={onSubmit}
      validate={trainingValidation(schema, media)}
      validateOnBlur
      validateOnChange>
      {({errors, touched, handleBlur}) => (
        <Form data-testid="training-form-form">
          <TrainingFormWireframe
            name={
              <FastField
                as={Input}
                data-testid="training-form-name"
                name="label"
                label={t('Enter training name')}
                error={!!(touched.label && errors.label)}
                helperText={errors.label}
              />
            }
            mediaList={
              <MediaList
                editable
                items={media}
                onOrderChanged={setMedia}
                onRemoveMedia={m => setMedia(media.filter(media => media.id != m.id))}
              />
            }
            mediaForm={
              <>
                <Typography variant="h5">{t('Add video')}</Typography>
                <props.MediaProviderComponent handleMediaFound={addMedia} />
                <FormHelperText error>{errors.media}</FormHelperText>
              </>
            }
            button={
              <Button color="primary" type="submit" loading={props.isLoading}>
                {t('Save training')}
              </Button>
            }
          />
        </Form>
      )}
    </Formik>
  );
};
