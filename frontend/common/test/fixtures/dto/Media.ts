import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {Media} from '@byot-frontend/common/src/types/dto/Media';
import {mocker} from '../Mocker';
import {dateTime} from './DateTime';
import {source} from './Source';

export const media = (): IMedia =>
  new Media({
    id: mocker.guid(),
    createdAt: dateTime(),
    label: mocker.sentence(),
    source: source(),
    updatedAt: dateTime(),
  });
