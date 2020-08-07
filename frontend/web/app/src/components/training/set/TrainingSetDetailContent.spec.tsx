import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetDetailContent} from './TrainingSetDetailContent';

describe('<TrainingSetDetailContent/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetDetailContent onRemove={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
