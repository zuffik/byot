import * as React from 'react';
import {render, wait, fireEvent} from '@testing-library/react-native';
import {RegistrationForm, testIDs} from './RegistrationForm';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';

describe('<RegistrationForm/>', () => {
  it('should fill all mandatory fields and submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'happy@path.sk',
      firstName: '',
      lastName: '',
      password: '123-Abc',
      passwordRepeat: '123-Abc',
      consent: true,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    const {passwordRepeat, consent, ...values} = userRegister;
    wait(() => expect(onRegister).toBeCalledWith(values));
    expect(asJSON()).toMatchSnapshot();
  });
  it('should fill all fields and submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'happy@path.sk',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc',
      passwordRepeat: '123-Abc',
      consent: true,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    const {passwordRepeat, consent, ...values} = userRegister;
    wait(() => expect(onRegister).toBeCalledWith(values));
    expect(asJSON()).toMatchSnapshot();
  });
  it('should omit consent and not submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'sad@path.sk',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc',
      passwordRepeat: '123-Abc',
      consent: false,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    wait(() => expect(onRegister).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
  it('should enter invalid email and not submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'sad.sk',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc',
      passwordRepeat: '123-Abc',
      consent: true,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    wait(() => expect(onRegister).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
  it('should enter invalid password and not submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'sad@path.sk',
      firstName: 'John',
      lastName: 'Doe',
      password: '123',
      passwordRepeat: '123',
      consent: true,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    wait(() => expect(onRegister).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
  it('should enter not matching passwords and not submit', () => {
    const onRegister = jest.fn();
    const {asJSON, getByTestId} = render(<RegistrationForm onRegister={onRegister} />);
    const userRegister: IUserRegister & {consent: boolean; passwordRepeat: string} = {
      email: 'sad@path.sk',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc',
      passwordRepeat: '123-ABc',
      consent: true,
    };
    fireEvent.changeText(getByTestId(testIDs.firstName), userRegister.firstName);
    fireEvent.changeText(getByTestId(testIDs.lastName), userRegister.lastName);
    fireEvent.changeText(getByTestId(testIDs.email), userRegister.email);
    fireEvent.changeText(getByTestId(testIDs.password), userRegister.password);
    fireEvent.changeText(getByTestId(testIDs.passwordRepeat), userRegister.passwordRepeat);
    if (userRegister.consent) {
      fireEvent.press(getByTestId(testIDs.consent));
    }
    fireEvent.press(getByTestId(testIDs.submit));
    wait(() => expect(onRegister).not.toBeCalled());
    expect(asJSON()).toMatchSnapshot();
  });
});
