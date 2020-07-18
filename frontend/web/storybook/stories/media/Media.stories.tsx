import * as React from 'react';
import {MediaList} from '@byot-frontend/web-app/src/components/media/list/MediaList';
import * as _ from 'lodash';
import {media} from '../../fixtures/dto/Media';
import {boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {
  MediaAutocompleteInput,
  MediaAutocompleteInputProps,
} from '@byot-frontend/web-app/src/components/media/form/MediaAutocompleteInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ResourceState} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {MediaSearchForm} from '@byot-frontend/web-app/src/components/media/form/MediaSearchForm';

export default {
  title: 'Media/Media',
};

export const list = () => (
  <MediaList
    items={_.times(10, () => media())}
    editable={boolean('Editable', false)}
    onOrderChanged={action('onOrderChanged')}
    onRemoveMedia={action('onRemoveMedia')}
  />
);

export const autocompleteInput = () => {
  const m = new IterableResource<IMedia>(_.times(10, () => media()));
  m.state = boolean('Is loading', false) ? ResourceState.LOADING : ResourceState.IDLE;
  return (
    <MediaAutocompleteInput
      media={m}
      onSelect={action('onSelect')}
      onTextChange={action('onTextChange')}
      onClear={action('onClear')}
    />
  );
};

export const searchForm = () => {
  const m = new IterableResource<IMedia>(_.times(10, () => media()));
  m.state = boolean('Is loading', false) ? ResourceState.LOADING : ResourceState.IDLE;
  return (
    <MediaSearchForm
      onSelect={action('onSelect')}
      AutocompleteComponent={(props: MediaAutocompleteInputProps) => (
        <MediaAutocompleteInput media={m} {...props} />
      )}
    />
  );
};
