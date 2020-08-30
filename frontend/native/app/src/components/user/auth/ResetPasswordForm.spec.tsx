import * as React from 'react';
import {render, fireEvent, wait} from '@testing-library/react-native';
import {ResetPasswordForm, testIDs} from './ResetPasswordForm';

describe('<ResetPasswordForm/>', () => {
  it('should successfully submit change', () => {
    const onSubmit = jest.fn();
    const {asJSON, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const pass = 'pass-123A';
    fireEvent.changeText(getByTestId(testIDs.newPassword), pass);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), pass);
    wait(() =>
      expect(onSubmit).toBeCalledWith({
        token: 'token',
        newPassword: pass,
        passwordRepeat: pass,
      })
    );
    expect(asJSON()).toMatchSnapshot();
  });
  it('should fail submitting because of non-matching passwords', () => {
    const onSubmit = jest.fn();
    const {asJSON, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const pass = 'pass-123A';
    fireEvent.changeText(getByTestId(testIDs.newPassword), pass);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), pass + 'addition');
    wait(() => expect(onSubmit).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
  it('should fail submitting because of easy passwords', () => {
    const onSubmit = jest.fn();
    const {asJSON, getByTestId} = render(
      <ResetPasswordForm onSubmit={onSubmit} loading={false} token="token" />
    );
    const pass = 'pass';
    fireEvent.changeText(getByTestId(testIDs.newPassword), pass);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), pass);
    wait(() => expect(onSubmit).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
});
