import * as React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {TrainingForm} from './TrainingForm';
import {TrainingDraftInput} from '@byot-frontend/common/src/types/dto/TrainingDraftInput';
import {training} from '@byot-frontend/common/test/fixtures/dto/Training';

describe('<TrainingForm/>', () => {
  it('should render', () => {
    const {container} = render(
      <TrainingForm onSave={jest.fn()} trainingSetId="id" MediaProviderComponent={() => <div />} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should submit only with label provided', async () => {
    const onSave = jest.fn();
    const {container, queryByTestId, getByTestId} = render(
      <TrainingForm onSave={onSave} trainingSetId="id" MediaProviderComponent={() => <div />} />
    );
    const form = getByTestId('training-form-form');
    const input = getByTestId('training-form-name').querySelector('input');
    expect(input).not.toBeNull();
    expect(queryByTestId('training-form-button-remove')).toBeNull();
    fireEvent.submit(form);
    expect(onSave).not.toBeCalled();
    const label = 'Training label';
    fireEvent.change(input!, {target: {value: label}});
    fireEvent.submit(form);
    await waitFor(() =>
      expect(onSave).toBeCalledWith(
        new TrainingDraftInput({
          media: [],
          idTrainingSet: 'id',
          label,
        })
      )
    );
    expect(container).toMatchSnapshot();
  });
  it('should edit the training', async () => {
    const onSave = jest.fn();
    const tr = training();
    const {container, getByTestId} = render(
      <TrainingForm training={tr} onSave={onSave} MediaProviderComponent={() => <div />} />
    );
    const form = getByTestId('training-form-form');
    const input = getByTestId('training-form-name').querySelector('input');
    expect(input).not.toBeNull();
    expect(input!.value).toEqual(tr.label);
    const label = 'Training label';
    fireEvent.change(input!, {target: {value: label}});
    fireEvent.submit(form);
    await waitFor(() =>
      expect(onSave).toBeCalledWith(
        new TrainingDraftInput({
          media: tr.media.entries.map(m => ({
            id: m.source.resourceId!,
            sourceType: m.source.sourceType,
            label: m.label,
          })),
          idTrainingSet: tr.trainingSet.id,
          label,
        })
      )
    );
    expect(container).toMatchSnapshot();
  });
});
