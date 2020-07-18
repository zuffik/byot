import * as React from 'react';
import {training} from '../../fixtures/dto/Training';
import {TrainingListItem} from '@byot-frontend/web-app/src/components/training/training/TrainingListItem';
import {TrainingListItemImagePlaceholder} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemImagePlaceholder';
import {TrainingListItemSkeleton} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemSkeleton';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import * as _ from 'lodash';
import {action} from '@storybook/addon-actions';
import {TrainingList} from '@byot-frontend/web-app/src/components/training/training/TrainingList';
import {TrainingForm} from '@byot-frontend/web-app/src/components/training/training/TrainingForm';
import {media} from '../../fixtures/dto/Media';
import {MediaSearchForm} from '@byot-frontend/web-app/src/components/media/form/MediaSearchForm';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {boolean} from '@storybook/addon-knobs';
import {ResourceState} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {
  MediaAutocompleteInput,
  MediaAutocompleteInputProps,
} from '@byot-frontend/web-app/src/components/media/form/MediaAutocompleteInput';
import {TrainingDetail} from '@byot-frontend/web-app/src/components/training/training/TrainingDetail';

export default {
  title: 'Trainings/Training',
};

export const skeleton = () => <TrainingListItemSkeleton />;

export const listItemImagePlaceholder = () => <TrainingListItemImagePlaceholder />;

export const listItem = () => <TrainingListItem training={training()} />;

export const list = () => {
  const items = new IterableResource(_.times(10, () => training()));
  items.totalCount = 20;
  return <TrainingList items={items} onLoadMore={action('onLoadMore')} />;
};

export const form = () => {
  const m = new IterableResource<IMedia>(_.times(10, () => media()));
  m.state = boolean('Is loading', false) ? ResourceState.LOADING : ResourceState.IDLE;
  const [Autocomplete] = React.useState(() => (props: MediaAutocompleteInputProps) => (
    <MediaAutocompleteInput media={m} {...props} />
  ));
  return (
    <TrainingForm
      trainingSetId="id"
      onSave={action('onSave')}
      onRemove={action('onRemove')}
      MediaProviderComponent={({handleMediaFound}) => (
        <MediaSearchForm onSelect={handleMediaFound} AutocompleteComponent={Autocomplete} />
      )}
    />
  );
};

export const detail = () => {
  const m = new IterableResource<IMedia>(_.times(10, () => media()));
  m.state = boolean('Is loading', false) ? ResourceState.LOADING : ResourceState.IDLE;
  return <TrainingDetail media={m} onMediaClick={action('onMediaClick')} currentMedia={m.data[0]} />;
};
