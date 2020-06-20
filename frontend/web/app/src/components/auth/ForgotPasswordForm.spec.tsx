import * as React from 'react';
import {ForgotPasswordForm} from './ForgotPasswordForm';
import {fireEvent, render, waitFor} from '@testing-library/react';

describe('<ForgotPasswordForm/>', () => {
  it('should successfully request reset', async () => {
    const onSubmit = jest.fn();
    const wrapper = render(<ForgotPasswordForm onSubmit={onSubmit} />);

    const emailValue = 'john@doe.com';
    const email = wrapper!.queryByTestId('common-auth-forgotPassword-form-email')!.querySelector('input')!;
    expect(email).not.toBeNull();
    fireEvent.change(email, {target: {value: emailValue}});
    expect(email.value).toEqual(emailValue);
    const form = wrapper!.queryByTestId('common-auth-forgotPassword-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onSubmit).toBeCalledWith(emailValue));
    expect(wrapper).toMatchSnapshot();
  });
  it('should fail requesting', async () => {
    const onSubmit = jest.fn();
    const wrapper = render(<ForgotPasswordForm onSubmit={onSubmit} />);

    const emailValue = 'john@doe';
    const email = wrapper!.queryByTestId('common-auth-forgotPassword-form-email')!.querySelector('input')!;
    expect(email).not.toBeNull();
    fireEvent.change(email, {target: {value: emailValue}});
    expect(email.value).toEqual(emailValue);
    const form = wrapper!.queryByTestId('common-auth-forgotPassword-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onSubmit).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
});
