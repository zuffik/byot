import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetListItem} from './TrainingSetListItem';
import {trainingSet} from '@byot-frontend/common/test/fixtures/dto/TrainingSet';

describe('<TrainingSetListItem/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetListItem trainingSet={trainingSet()} />);
    expect(container).toMatchSnapshot();
  });
});
