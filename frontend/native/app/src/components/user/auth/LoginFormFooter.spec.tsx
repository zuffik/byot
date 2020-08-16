import * as React from 'react';
import {render, fireEvent, wait} from '@testing-library/react-native';
import {LoginFormFooter} from './LoginFormFooter';

describe('<LoginFormFooter/>', () => {
  it('should render and call events', async () => {
    const onRegisterPress = jest.fn();
    const onPasswordResetPress = jest.fn();
    const {asJSON, getByTestId} = render(
      <LoginFormFooter onRegisterPress={onRegisterPress} onPasswordRequestPress={onPasswordResetPress} />
    );
    fireEvent.press(getByTestId('auth-loginFormFooter-forgotPassword'));
    await wait(() => expect(onPasswordResetPress).toBeCalled());
    fireEvent.press(getByTestId('auth-loginFormFooter-register'));
    await wait(() => expect(onRegisterPress).toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
});
