import * as React from 'react';
import {fireEvent, render, act, waitFor} from '@testing-library/react';
import {ResetPasswordForm} from './ResetPasswordForm';

describe('<ResetPasswordForm/>', () => {
  it('should render', () => {
    const {container} = render(<ResetPasswordForm onSubmit={jest.fn()} loading={false} token="token" />);
    expect(container).toMatchSnapshot();
  });
  it('should not accept simple password', async () => {
    const onSubmit = jest.fn();
    const {container, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const newPassword = getByTestId('common-auth-resetPassword-form-newPassword').querySelector('input');
    const passwordRepeat = getByTestId('common-auth-resetPassword-form-passwordRepeat').querySelector(
      'input'
    );
    const button = getByTestId('common-auth-resetPassword-form-form').querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
    expect(newPassword).not.toBeNull();
    expect(passwordRepeat).not.toBeNull();
    fireEvent.change(newPassword!, {target: {value: 'a'}});
    fireEvent.change(passwordRepeat!, {target: {value: 'a'}});
    fireEvent.click(button!);
    await waitFor(() => expect(onSubmit).not.toBeCalled());
    expect(container).toMatchSnapshot();
  });
  it('should not accept different passwords', async () => {
    const onSubmit = jest.fn();
    const {container, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const newPassword = getByTestId('common-auth-resetPassword-form-newPassword').querySelector('input');
    const passwordRepeat = getByTestId('common-auth-resetPassword-form-passwordRepeat').querySelector(
      'input'
    );
    const button = getByTestId('common-auth-resetPassword-form-form').querySelector('button[type="submit"]');
    expect(newPassword).not.toBeNull();
    expect(passwordRepeat).not.toBeNull();
    expect(button).not.toBeNull();
    fireEvent.change(newPassword!, {target: {value: '123-Abc$'}});
    fireEvent.change(passwordRepeat!, {target: {value: '123-AbcS'}});
    fireEvent.click(button!);
    await waitFor(() => expect(onSubmit).not.toBeCalled());
    expect(container).toMatchSnapshot();
  });
  it('should accept same difficult passwords', async () => {
    const onSubmit = jest.fn();
    const {container, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const newPassword = getByTestId('common-auth-resetPassword-form-newPassword').querySelector('input');
    const passwordRepeat = getByTestId('common-auth-resetPassword-form-passwordRepeat').querySelector(
      'input'
    );
    const button = getByTestId('common-auth-resetPassword-form-form').querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
    expect(newPassword).not.toBeNull();
    expect(passwordRepeat).not.toBeNull();
    fireEvent.change(newPassword!, {target: {value: '123-Abc$'}});
    fireEvent.change(passwordRepeat!, {target: {value: '123-Abc$'}});
    fireEvent.click(button!);
    await waitFor(() =>
      expect(onSubmit).toBeCalledWith({
        newPassword: '123-Abc$',
        passwordRepeat: '123-Abc$',
        token: 'token',
      })
    );
    expect(container).toMatchSnapshot();
  });
});
