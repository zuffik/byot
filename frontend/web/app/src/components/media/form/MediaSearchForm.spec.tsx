import * as React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {MediaSearchForm} from './MediaSearchForm';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

describe('<MediaSearchForm/>', () => {
  it('should render idle state', () => {
    const {container} = render(
      <MediaSearchForm AutocompleteComponent={() => <div />} onSelect={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should call event only once when the media is selected', () => {
    const onSelect = jest.fn();
    const m = media();
    const {container, getByTestId} = render(
      <MediaSearchForm
        AutocompleteComponent={({onSelect}) => (
          <div data-testid="test-media-trigger" onClick={() => onSelect(m)} />
        )}
        onSelect={onSelect}
      />
    );
    const button = getByTestId('media-form-search-button');
    fireEvent.click(button);
    expect(onSelect).not.toBeCalled();
    const autocomplete = getByTestId('test-media-trigger');
    fireEvent.click(autocomplete);
    fireEvent.click(button);
    expect(onSelect).toBeCalledWith(expect.objectContaining({...m, id: expect.any(String)}));
    expect(container).toMatchSnapshot();
  });
  it('should call event with custom label', () => {
    const onSelect = jest.fn();
    const m = media();
    const {container, getByTestId} = render(
      <MediaSearchForm
        AutocompleteComponent={({onSelect}) => (
          <div data-testid="test-media-trigger" onClick={() => onSelect(m)} />
        )}
        onSelect={onSelect}
      />
    );
    const button = getByTestId('media-form-search-button');
    const autocomplete = getByTestId('test-media-trigger');
    const labelInput = getByTestId('media-form-search-input').querySelector('input');
    expect(labelInput).not.toBeNull();
    const newLabel = 'New media label';
    fireEvent.click(autocomplete);
    fireEvent.change(labelInput!, {target: {value: newLabel}});
    fireEvent.click(button);

    expect(onSelect).toBeCalledWith(expect.objectContaining({...m, label: newLabel, id: expect.any(String)}));
    expect(container).toMatchSnapshot();
  });
});
