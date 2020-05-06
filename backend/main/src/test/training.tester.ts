import {
  SourceType,
  Training as ITraining,
  TrainingMediaInput,
  TrainingUpdateInput,
} from '../graphql/ts/types';
import { Training } from '../training/training/training.entity';
import { testDateTime } from './datetime.tester';
import { testMedia } from './media.tester';
import { testList } from './list.tester';
import { testUser } from './user.tester';
import { testTrainingSet } from './training-set.tester';

export async function testTraining(
  training: Training | ITraining | any,
  checkTrainingSet: boolean = true,
) {
  expect(training).toBeDefined();
  expect(training).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      label: expect.any(String),
    }),
  );
  if (training.medias) {
    (await training.medias).forEach(testMedia);
  }
  if (training.media) {
    testList(training.media);
    training.media.entries.forEach(testMedia);
  }
  if (training.owner) {
    await testUser(
      training.owner instanceof Promise ? await training.owner : training.owner,
    );
  }
  if (training.trainingSet && checkTrainingSet) {
    await testTrainingSet(
      training.trainingSet instanceof Promise
        ? await training.trainingSet
        : training.trainingSet,
      false,
    );
  }
  testDateTime(training.createdAt);
  testDateTime(training.updatedAt);
}

export function testTrainingMediaInput(t: TrainingMediaInput) {
  expect(t).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      sourceType: SourceType.YOUTUBE,
    }),
  );
}

export function testTrainingUpdateInput(t: TrainingUpdateInput) {
  expect(t).toEqual(
    expect.objectContaining({
      label: expect.any(String),
      media: expect.any(Array),
    }),
  );
  t.media.forEach(testTrainingMediaInput);
}
