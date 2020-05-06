import {
  TrainingSet as ITrainingSet,
  TrainingSetInput,
} from '../graphql/ts/types';
import { TrainingSet } from '../training/training-set/training-set.entity';
import { testDateTime } from './datetime.tester';
import { testUser } from './user.tester';
import { testTraining } from './training.tester';
import { testList } from './list.tester';

export async function testTrainingSet(
  trainingSet: TrainingSet | ITrainingSet | any,
  checkTrainings: boolean = true,
) {
  expect(trainingSet).toBeDefined();
  expect(trainingSet).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      label: expect.any(String),
    }),
  );
  await testUser(await trainingSet.owner);
  if (checkTrainings) {
    if (trainingSet.trainings instanceof Promise) {
      await Promise.all(
        (await trainingSet.trainings).map((t) => testTraining(t, false)),
      );
    } else {
      testList(trainingSet.trainings);
      await Promise.all(
        trainingSet.trainings.entries.map((t) => testTraining(t, false)),
      );
    }
  }
  testDateTime(trainingSet.createdAt);
  testDateTime(trainingSet.updatedAt);
}

export function testTrainingSetInput(t: TrainingSetInput) {
  expect(t).toEqual(
    expect.objectContaining({
      label: expect.any(String),
    }),
  );
}
