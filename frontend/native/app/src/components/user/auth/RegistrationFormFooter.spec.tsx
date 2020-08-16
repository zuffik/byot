import * as React from 'react';
import {render, wait, fireEvent} from '@testing-library/react-native';
import {RegistrationFormFooter} from './RegistrationFormFooter';

describe('<RegistrationFormFooter/>', () => {
  it('should render', async () => {
    const onLogInPress = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationFormFooter onLogInPress={onLogInPress} />);
    fireEvent.press(getByTestId('auth-registrationFormFooter-login'));
    await wait(() => expect(onLogInPress).toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
});
