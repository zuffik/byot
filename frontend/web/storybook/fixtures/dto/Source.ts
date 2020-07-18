import {ISource} from '@byot-frontend/common/src/types/interfaces/ISource';
import {Source} from '@byot-frontend/common/src/types/dto/Source';
import {mocker} from '../../helpers/Mocker';
import {MediaType, SourceType} from '../../../../../common/graphql/ts/types';

const resourceIds = [
  '-5ztdzyQkSQ',
  '0mjb0u4kIXQ',
  '1qc5bAgZ0uY',
  '1W94gw1An_4',
  '2f2RhOdc0Lw',
  '2yPSQnnLNDc',
  '3_9DulcG_BM',
  '4YpYxExBmuU',
  '7iat95zIeUc',
  '8I8lwVJi6AA',
  '98HBwrZTd5Y',
  '9ZfwF1ue8fI',
  'ABg0c_E7OOI',
  'Bci1O8gYKHU',
  'BCuwDhmiOFQ',
  'ceCuZuGmaGU',
  'dSJ24tJri4c',
  'ee58iWQ1bxQ',
  'eTxO5ZMxcsc',
  'f7wy5DWM0jg',
];
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

export const source = (): ISource => {
  const resourceId = mocker.pickone(resourceIds);
  return new Source({
    id: mocker.guid(),
    thumbnail: thumb(resourceId),
    resourceId,
    mediaType: MediaType.VIDEO,
    sourceType: SourceType.YOUTUBE,
  });
};
