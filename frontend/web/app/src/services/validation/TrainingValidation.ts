import {TFunction} from 'i18next';
import * as Yup from 'yup';
import {ITrainingDraftInput} from '@byot-frontend/common/src/types/interfaces/ITrainingDraftInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';

export const trainingSchema = (t: TFunction, includeMedia: boolean = true) =>
  Yup.object().shape({
    label: Yup.string().required(t('Enter training name')),
    ...(includeMedia && {media: Yup.array().min(1, t('Provide at least one media to training'))}),
  });

export const trainingValidation = (schema: Yup.ObjectSchema, media: IMedia[]) => (
  values: ITrainingDraftInput
): Partial<Record<keyof ITraining, string>> => {
  try {
    schema.validateSync(
      {
        ...values,
        media: media.map(m => ({
          id: m.source.resourceId!,
          label: m.label,
          sourceType: m.source.sourceType,
        })),
      },
      {abortEarly: false}
    );
    return {};
  } catch (e) {
    const error: Yup.ValidationError = e;
    return Object.assign({}, ...error.inner.map(i => ({[(i.params as any).path]: i.message})));
  }
};
