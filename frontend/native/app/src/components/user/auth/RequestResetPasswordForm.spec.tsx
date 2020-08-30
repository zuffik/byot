import * as React from 'react';
import {fireEvent, render, wait} from '@testing-library/react-native';
import {RequestResetPasswordForm, testIDs} from './RequestResetPasswordForm';
import {LoginForm} from './LoginForm';

describe('<RequestResetPasswordForm/>', () => {
  it('should submit form with valid email', () => {
    const email = 'email@email.sk';
    const onSubmit = jest.fn();
    const {asJSON, getByTestId} = render(<RequestResetPasswordForm onSubmit={onSubmit} />);
    const emailInput = getByTestId(testIDs.email)!;
    const button = getByTestId(testIDs.submit)!;
    fireEvent.changeText(emailInput, email);
    fireEvent.press(button);
    wait(() => expect(onSubmit).toBeCalledWith(email));
    expect(asJSON()).toMatchSnapshot();
  });
  it('should not submit form with invalid email', () => {
    const email = 'email@email.sk';
    const onSubmit = jest.fn();
    const {asJSON, getByTestId} = render(<RequestResetPasswordForm onSubmit={onSubmit} />);
    const emailInput = getByTestId(testIDs.email)!;
    const button = getByTestId(testIDs.submit)!;
    fireEvent.changeText(emailInput, email);
    fireEvent.press(button);
    wait(() => expect(onSubmit).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
});
