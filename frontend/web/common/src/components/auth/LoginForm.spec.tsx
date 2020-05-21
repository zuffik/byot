import * as React from 'react';
import {LoginForm} from './LoginForm';
import {fireEvent, render, waitFor} from '@testing-library/react';

describe('<LoginForm/>', () => {
  it('should submit form with credentials', async () => {
    const credentials = {
      userNameOrEmail: 'username',
      password: 'password',
    };
    const onLogin = jest.fn();
    const wrapper = render(<LoginForm onLogin={onLogin} />);

    const username = wrapper!.queryByTestId('common-auth-login-form-username')!.querySelector('input')!;
    expect(username).not.toBeNull();
    const password = wrapper!.queryByTestId('common-auth-login-form-password')!.querySelector('input')!;
    expect(password).not.toBeNull();
    const form = wrapper!.queryByTestId('common-auth-login-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.change(username, {target: {value: credentials.userNameOrEmail}});
    expect(username.value).toEqual(credentials.userNameOrEmail);
    fireEvent.change(password, {target: {value: credentials.password}});
    expect(password.value).toEqual(credentials.password);
    fireEvent.submit(form);
    await waitFor(() => expect(onLogin).toBeCalledWith(credentials));
    expect(wrapper).toMatchSnapshot();
  });

  it('should not submit form with one credential missing', async () => {
    const credentials = {
      userNameOrEmail: 'username',
      password: 'password',
    };
    const onLogin = jest.fn();
    const wrapper = render(<LoginForm onLogin={onLogin} />);

    const username = wrapper!.queryByTestId('common-auth-login-form-username')!.querySelector('input')!;
    expect(username).not.toBeNull();
    const password = wrapper!.queryByTestId('common-auth-login-form-password')!.querySelector('input')!;
    expect(password).not.toBeNull();
    const form = wrapper!.queryByTestId('common-auth-login-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.change(username, {target: {value: credentials.userNameOrEmail}});
    expect(username.value).toEqual(credentials.userNameOrEmail);
    fireEvent.submit(form);
    await waitFor(() => expect(onLogin).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
});
