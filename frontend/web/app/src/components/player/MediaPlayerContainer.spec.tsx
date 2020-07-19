import * as React from 'react';
import {render, waitFor, act, fireEvent} from '@testing-library/react';
import {MediaPlayerContainer} from './MediaPlayerContainer';

describe('<MediaPlayerContainer/>', () => {
  it('should render', () => {
    const {container} = render(<MediaPlayerContainer />);
    expect(container).toMatchSnapshot();
  });
  it('should calculate width (16:9)', async () => {
    jest.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          width: 1600,
        } as any)
    );
    const {container, getByTestId} = render(<MediaPlayerContainer />);
    const mpContainer = getByTestId('media-player-container');
    expect(mpContainer.style.height).toEqual('900px');
    expect(container).toMatchSnapshot();
  });
  it('should calculate width (4:3)', async () => {
    jest.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          width: 400,
        } as any)
    );
    const {container, getByTestId} = render(<MediaPlayerContainer ratio="4:3" />);
    const mpContainer = getByTestId('media-player-container');
    expect(mpContainer.style.height).toEqual('300px');
    expect(container).toMatchSnapshot();
  });
});
