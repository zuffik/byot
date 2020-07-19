import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingListItem} from './TrainingListItem';
import {training} from '@byot-frontend/common/test/fixtures/dto/Training';

describe('<TrainingListItem/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingListItem training={training()} />);
    expect(container).toMatchSnapshot();
  });
});
