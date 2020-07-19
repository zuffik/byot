import * as React from 'react';
import {render} from '@testing-library/react';
import {CheckboxRadioBase} from './CheckboxRadioBase';

describe('<CheckboxRadioBase/>', () => {
  it('should render', () => {
    const {container} = render(<CheckboxRadioBase label="Label" component={() => <div />} />);
    expect(container).toMatchSnapshot();
  });
});
