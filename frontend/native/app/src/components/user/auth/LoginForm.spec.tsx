import * as React from 'react';
import {LoginForm} from './LoginForm';
import {fireEvent, render, wait} from '@testing-library/react-native';

// todo export provider to component OOOR consider using mocks <Text/> from ui-kitten to <Text/> from react-native
describe('<LoginForm/>', () => {
  it('should submit form with credentials', () => {
    const credentials = {
      userNameOrEmail: 'username',
      password: 'password',
    };
    const onLogin = jest.fn();
    const wrapper = render(<LoginForm onSubmit={onLogin} />);
    const username = wrapper!.queryByTestId('loginForm-usernameEmail-input')!;
    expect(username).not.toBeNull();
    const password = wrapper!.queryByTestId('loginForm-password-input')!;
    expect(password).not.toBeNull();
    const button = wrapper!.queryByTestId('element-button')!;
    expect(button).not.toBeNull();
    fireEvent.changeText(username, credentials.userNameOrEmail);
    fireEvent.changeText(password, credentials.password);
    fireEvent.press(button);
    wait(() => expect(onLogin).toBeCalledWith(credentials));
    expect(wrapper.asJSON()).toMatchSnapshot();
  });

  it('should not submit form with one credential missing', () => {
    const credentials = {
      userNameOrEmail: 'username',
      password: 'password',
    };
    const onLogin = jest.fn();
    const wrapper = render(<LoginForm onSubmit={onLogin} />);
    const username = wrapper!.queryByTestId('loginForm-usernameEmail-input')!;
    expect(username).not.toBeNull();
    const password = wrapper!.queryByTestId('loginForm-password-input')!;
    expect(password).not.toBeNull();
    const button = wrapper!.queryByTestId('element-button')!;
    expect(button).not.toBeNull();
    fireEvent.changeText(username, credentials.userNameOrEmail);
    fireEvent.press(button);
    wait(() => expect(onLogin).not.toBeCalledWith(credentials));
    expect(wrapper.asJSON()).toMatchSnapshot();
  });
});
