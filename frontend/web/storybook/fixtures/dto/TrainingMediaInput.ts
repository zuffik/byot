import {TrainingMediaInput} from '@byot-frontend/common/src/types/dto/TrainingMediaInput';
import {ITrainingMediaInput} from '@byot-frontend/common/src/types/interfaces/ITrainingMediaInput';
import {media} from './Media';

export const trainingMediaInput = ({}: {} = {}): ITrainingMediaInput => {
  const m = media();
  return new TrainingMediaInput({
    id: m.source.resourceId,
    sourceType: m.source.sourceType,
    label: m.label,
  });
};
