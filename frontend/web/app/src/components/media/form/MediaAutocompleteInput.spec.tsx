import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {MediaAutocompleteInput} from './MediaAutocompleteInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import * as _ from 'lodash';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

jest.mock('../list/MediaListItem', () => ({
  __esModule: true,
  MediaListItem: ({onClick, media}: any) => (
    <div data-testid="media-list-item" onClick={onClick} data-media-id={media.id} />
  ),
}));

describe('<MediaAutocompleteInput/>', () => {
  it('should render idle state', () => {
    const {container} = render(
      <MediaAutocompleteInput id="autocomplete" onSelect={jest.fn()} media={new IterableResource<IMedia>()} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should render focused state', async () => {
    const m = new IterableResource<IMedia>(_.times(3, () => media()));
    const {baseElement, getByTestId, queryAllByTestId} = render(
      <MediaAutocompleteInput id="autocomplete" onSelect={jest.fn()} media={m} />
    );
    const input = getByTestId('media-form-autocomplete-input');
    fireEvent.mouseDown(input);
    getByTestId('media-form-autocomplete-suggestions');
    expect(queryAllByTestId('media-list-item')).toHaveLength(m.data.length);
    expect(baseElement).toMatchSnapshot();
  });
  it('should select the right media', () => {
    const m = new IterableResource<IMedia>(_.times(3, () => media()));
    const onSelect = jest.fn();
    const label = "Totally unique label that the chance won't didly generate";
    m.data[0].label = label;
    const {container, getByTestId, queryAllByTestId} = render(
      <MediaAutocompleteInput id="autocomplete" onSelect={onSelect} media={m} />
    );
    const input = getByTestId('media-form-autocomplete-input');
    fireEvent.mouseDown(input);
    getByTestId('media-form-autocomplete-suggestions');
    expect(queryAllByTestId('media-list-item')).toHaveLength(m.data.length);
    fireEvent.change(input, {target: {value: label}});
    expect(queryAllByTestId('media-list-item')).toHaveLength(1);
    expect(getByTestId('media-list-item').dataset['mediaId']).toEqual(m.data[0].id);
    expect(container).toMatchSnapshot();
  });
});
