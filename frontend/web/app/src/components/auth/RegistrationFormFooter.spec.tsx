import * as React from 'react';
import {render} from '@testing-library/react';
import {RegistrationFormFooter} from './RegistrationFormFooter';

describe('<RegistrationFormFooter/>', () => {
  it('should render', () => {
    const {container} = render(<RegistrationFormFooter />);
    expect(container).toMatchSnapshot();
  });
});
