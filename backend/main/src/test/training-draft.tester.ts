import { TrainingDraftInput } from '../graphql/ts/types';
import { testTrainingMediaInput } from './training.tester';

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
