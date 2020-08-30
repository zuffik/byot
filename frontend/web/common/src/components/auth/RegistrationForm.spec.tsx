import * as React from 'react';
import {RegistrationForm} from './RegistrationForm';
import {act, fireEvent, render, RenderResult, waitFor} from '@testing-library/react';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';

const fillData = (wrapper: RenderResult, data: IUserRegister & any) => {
  const firstName = wrapper!
    .queryByTestId('common-auth-registration-form-firstName')!
    .querySelector('input')!;
  expect(firstName).not.toBeNull();
  const lastName = wrapper!.queryByTestId('common-auth-registration-form-lastName')!.querySelector('input')!;
  expect(lastName).not.toBeNull();
  const email = wrapper!.queryByTestId('common-auth-registration-form-email')!.querySelector('input')!;
  expect(email).not.toBeNull();
  const password = wrapper!.queryByTestId('common-auth-registration-form-password')!.querySelector('input')!;
  expect(password).not.toBeNull();
  const passwordRepeat = wrapper!
    .queryByTestId('common-auth-registration-form-passwordRepeat')!
    .querySelector('input')!;
  expect(passwordRepeat).not.toBeNull();
  const consent = wrapper!.queryByTestId('common-auth-registration-form-consent')!.querySelector('input')!;
  expect(consent).not.toBeNull();

  act(() => {
    fireEvent.change(firstName, {target: {value: data.firstName}});
    fireEvent.change(lastName, {target: {value: data.lastName}});
    fireEvent.change(email, {target: {value: data.email}});
    fireEvent.change(password, {target: {value: data.password}});
    fireEvent.change(passwordRepeat, {target: {value: data.passwordRepeat}});
    if (data.consent) {
      fireEvent.click(consent);
    }
  });

  expect(firstName.value).toEqual(data.firstName);
  expect(lastName.value).toEqual(data.lastName);
  expect(email.value).toEqual(data.email);
  expect(password.value).toEqual(data.password);
  expect(passwordRepeat.value).toEqual(data.passwordRepeat);
  expect(consent.checked).toEqual(data.consent);
};

describe('<RegistrationForm/>', () => {
  it('should submit form with all data', async () => {
    const registrationData: IUserRegister = {
      email: 'email@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc-',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: '123-Abc-',
      consent: true,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).toBeCalledWith(registrationData));
    expect(wrapper).toMatchSnapshot();
  });
  it('should submit form with mandatory data', async () => {
    const registrationData: IUserRegister = {
      email: 'email@example.com',
      firstName: '',
      lastName: '',
      password: '123-Abc-',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: '123-Abc-',
      consent: true,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).toBeCalledWith(registrationData));
    expect(wrapper).toMatchSnapshot();
  });
  it('should submit form with missing consent', async () => {
    const registrationData: IUserRegister = {
      email: 'email@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc-',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: '123-Abc-',
      consent: false,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
  it('should submit form with missing data', async () => {
    const registrationData: IUserRegister = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: '',
      consent: true,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
  it('should submit form with weak password', async () => {
    const registrationData: IUserRegister = {
      email: 'email@example.com',
      firstName: '',
      lastName: '',
      password: 'weak',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: 'weak',
      consent: true,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
  it('should submit form with non-matching', async () => {
    const registrationData: IUserRegister = {
      email: 'email@example.com',
      firstName: '',
      lastName: '',
      password: '123-ABc-',
      userName: undefined,
    };
    const data = {
      ...registrationData,
      passwordRepeat: '123-Abc-',
      consent: true,
    };
    const onRegister = jest.fn();
    const wrapper = render(<RegistrationForm onRegister={onRegister} />);

    fillData(wrapper, data);

    const form = wrapper!.queryByTestId('common-auth-registration-form-form')!;
    expect(form).not.toBeNull();
    fireEvent.submit(form);
    await waitFor(() => expect(onRegister).not.toBeCalled());
    expect(wrapper).toMatchSnapshot();
  });
});
