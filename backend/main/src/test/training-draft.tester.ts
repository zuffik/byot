import {
  TrainingDraft,
  TrainingDraftInput,
  TrainingMediaInput,
} from '../graphql/ts/types';
import { testMedia } from './media.tester';
import { testTrainingMediaInput } from './training.tester';

export function testTrainingDraft(t: TrainingDraft | any) {
  expect(t).toEqual(
    expect.objectContaining({
      label: expect.any(String),
      idTrainingSet: expect.any(String),
      media: expect.any(Array),
    }),
  );
  t.media?.forEach(testMedia);
}

export function testTrainingDraftInput(t: TrainingDraftInput | any) {
  expect(t).toEqual(
    expect.objectContaining({
      label: expect.any(String),
      idTrainingSet: expect.any(String),
      media: expect.any(Array),
    }),
  );
  t.media?.forEach(testTrainingMediaInput);
}
