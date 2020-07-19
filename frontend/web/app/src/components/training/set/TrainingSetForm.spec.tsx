import * as React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {TrainingSetForm} from './TrainingSetForm';
import {TrainingSetInput} from '@byot-frontend/common/src/types/dto/TrainingSetInput';

describe('<TrainingSetForm/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetForm onSave={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it('should submit only if label is provided', async () => {
    const onSave = jest.fn();
    const {container, getByTestId} = render(<TrainingSetForm onSave={onSave} />);
    const input = getByTestId('training-set-form-label').querySelector('input');
    expect(input).not.toBeNull();
    const form = getByTestId('training-set-form-form');
    const label = 'Training set label';
    fireEvent.submit(form);
    expect(onSave).not.toBeCalled();
    fireEvent.change(input!, {target: {value: label}});
    fireEvent.submit(form);
    await waitFor(() =>
      expect(onSave).toBeCalledWith(expect.objectContaining(new TrainingSetInput({label})), expect.anything())
    );
    expect(container).toMatchSnapshot();
  });
});
