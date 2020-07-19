import * as React from 'react';
import {render} from '@testing-library/react';
import {MediaListItem} from './MediaListItem';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

describe('<MediaListItem/>', () => {
  it('should render', () => {
    const {container} = render(<MediaListItem media={media()} />);
    expect(container).toMatchSnapshot();
  });
  it('should render with description', () => {
    const {container} = render(<MediaListItem media={media()} description="Description" />);
    expect(container).toMatchSnapshot();
  });
  it('should render transparent', () => {
    const {container} = render(<MediaListItem media={media()} transparent />);
    expect(container).toMatchSnapshot();
  });
  it('should render with link', () => {
    const {container} = render(<MediaListItem media={media()} link="http://example.com/url" />);
    expect(container.querySelector('a[href="http://example.com/url"]')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
  it('should render with onClick', () => {
    const {container} = render(<MediaListItem media={media()} onClick={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
