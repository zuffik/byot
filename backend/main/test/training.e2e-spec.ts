import { INestApplication } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { createApp, destroyApp } from './helpers/module.helper';
import { graphQLInteraction } from '../src/graphql/ts/interaction';
import { loginTestUser, makeGraphQLRequest } from './helpers/http.helper';
import { Role } from '../src/graphql/ts/types';
import { testList } from '../src/test/list.tester';
import { testTraining } from '../src/test/training.tester';
import { TrainingSetService } from '../src/training/training-set/training-set.service';
import { MediaService } from '../src/media/media/media.service';
import { testMedia } from '../src/test/media.tester';

describe('Training integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let gqlGenerator: GeneratorGraphqlService;
  let trainingSetService: TrainingSetService;
  let localMediaService: MediaService;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    trainingSetService = app.get<TrainingSetService>(TrainingSetService);
    localMediaService = app.get<MediaService>(MediaService);
  });

  it('should contain valid structure', async () => {
    expect(gqlGenerator).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allTrainings');
    expect(graphQLInteraction).toHaveProperty('training');
    expect(graphQLInteraction).toHaveProperty('createTraining');
    expect(graphQLInteraction).toHaveProperty('updateTraining');
    // expect(graphQLInteraction).toHaveProperty('removeMediaFromTraining');
    // expect(graphQLInteraction).toHaveProperty('removeTrainingFromTrainingSet');
  });

  it('should fetch all trainings as admin', async () => {
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.allTrainings({ pagination: { limit: 10 } }),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    testList(result.body.data.allTrainings);
    await Promise.all(
      result.body.data.allTrainings.entries.map((training) =>
        testTraining(training),
      ),
    );
  });

  it('should fail fetching all trainings as user', async () => {
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.allTrainings({ pagination: { limit: 10 } }),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should create training as admin', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.createTrainingSet(gqlGenerator.trainingSetInput()),
        { userRole: Role.USER },
      )
    ).body.data.createTrainingSet;
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.ADMIN },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const training = gqlGenerator.trainingDraftInput();
    training.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    training.idTrainingSet = trainingSet.id;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTraining(training),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.createTraining);
    await Promise.all(
      result.body.data.createTraining.media.entries.map(testMedia),
    );
  });

  it('should create training as owner of training set', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.createTrainingSet(gqlGenerator.trainingSetInput()),
        { token: auth.token },
      )
    ).body.data.createTrainingSet;
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { token: auth.token },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const training = gqlGenerator.trainingDraftInput();
    training.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    training.idTrainingSet = trainingSet.id;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTraining(training),
      { token: auth.token },
    );
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.createTraining);
    await Promise.all(
      result.body.data.createTraining.media.entries.map(testMedia),
    );
  });

  it('should create training as owner of existing training set', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { token: auth.token },
      )
    ).body.data.allTrainingSets.entries[0];
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { token: auth.token },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const training = gqlGenerator.trainingDraftInput();
    training.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    training.idTrainingSet = trainingSet.id;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTraining(training),
      { token: auth.token },
    );
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.createTraining);
    await Promise.all(
      result.body.data.createTraining.media.entries.map(testMedia),
    );
    const tSet = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(training.idTrainingSet),
      { userRole: Role.USER },
    );
    expect(tSet.body.errors).toBeUndefined();
    expect(tSet.body.data.trainingSet.trainings.entries.length).toEqual(
      trainingSet.trainings.meta.totalCount + 1,
    );
  });

  it('should fail creating training within non-existing training set', async () => {
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.ADMIN },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const training = gqlGenerator.trainingDraftInput();
    training.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    training.idTrainingSet = 'non-existing-id';
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTraining(training),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fail creating training as non-owner of training set', async () => {
    const auth = await loginTestUser(app, Role.USER, 3);
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.createTrainingSet(gqlGenerator.trainingSetInput()),
        { userRole: Role.USER },
      )
    ).body.data.createTrainingSet;
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { token: auth.token },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const training = gqlGenerator.trainingDraftInput();
    training.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    training.idTrainingSet = trainingSet.id;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTraining(training),
      { token: auth.token },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fetch training as admin', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.ADMIN },
      )
    ).body.data.allTrainingSets.entries[0];
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.training(trainingSet.trainings.entries[0].id),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.training);
  });

  it('should fetch training as owner', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER },
      )
    ).body.data.allTrainingSets.entries[0];
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.training(trainingSet.trainings.entries[0].id),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.training);
  });

  it('should fail fetching training as non-owner', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER, demoAccount: 2 },
      )
    ).body.data.allTrainingSets.entries[0];
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.training(trainingSet.trainings.entries[0].id),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fail fetching non-existing training', async () => {
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.training('non-existing-id'),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should update training as admin', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.ADMIN },
      )
    ).body.data.allTrainingSets.entries[0];
    const training = trainingSet.trainings.entries[0];
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.ADMIN },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const input = gqlGenerator.trainingUpdateInput();
    input.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTraining(training.id, input),
      { userRole: Role.ADMIN },
    );
    expect(
      result.body.data.updateTraining.media.entries.map((e) => ({
        id: e.source.resourceId,
        sourceType: e.source.sourceType,
      })),
    ).toEqual(input.media);
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.updateTraining);
    const trainingResult = await makeGraphQLRequest(
      app,
      graphQLInteraction.training(training.id),
      { userRole: Role.ADMIN },
    );
    expect(result.body.data.updateTraining).toEqual(
      expect.objectContaining({
        ...trainingResult.body.data.training,
        updatedAt: {
          humanReadable: expect.any(String),
          iso: expect.any(String),
        },
        media: {
          ...trainingResult.body.data.training.media,
          entries: expect.arrayContaining(
            trainingResult.body.data.training.media.entries,
          ),
        },
      }),
    );
  });

  it('should update training as owner', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER },
      )
    ).body.data.allTrainingSets.entries[0];
    const training = trainingSet.trainings.entries[0];
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.USER },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const input = gqlGenerator.trainingUpdateInput();
    input.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTraining(training.id, input),
      { userRole: Role.USER },
    );
    expect(
      result.body.data.updateTraining.media.entries.map((e) => ({
        id: e.source.resourceId,
        sourceType: e.source.sourceType,
      })),
    ).toEqual(input.media);
    expect(result.body.errors).toBeUndefined();
    await testTraining(result.body.data.updateTraining);
    const trainingResult = await makeGraphQLRequest(
      app,
      graphQLInteraction.training(training.id),
      { userRole: Role.USER },
    );
    expect(result.body.data.updateTraining).toEqual(
      expect.objectContaining({
        ...trainingResult.body.data.training,
        updatedAt: {
          humanReadable: expect.any(String),
          iso: expect.any(String),
        },
        media: {
          ...trainingResult.body.data.training.media,
          entries: expect.arrayContaining(
            trainingResult.body.data.training.media.entries,
          ),
        },
      }),
    );
  });

  it('should fail updating training as non-owner', async () => {
    const trainingSet = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER },
      )
    ).body.data.allTrainingSets.entries[0];
    const training = trainingSet.trainings.entries[0];
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.USER },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const input = gqlGenerator.trainingUpdateInput();
    input.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTraining(training.id, input),
      { userRole: Role.USER, demoAccount: 3 },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fail updating non-existing training', async () => {
    const medias = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.findMedia({
          local: true,
          query: 'workout',
          pagination: { limit: 5 },
        }),
        { userRole: Role.ADMIN },
      )
    ).body.data.findMedia;
    const [[localMedia]] = await localMediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const lms = await localMedia.source;
    medias.entries.push({
      ...localMedia,
      source: { ...lms },
    });
    const input = gqlGenerator.trainingUpdateInput();
    input.media = medias.entries.map((media) => ({
      sourceType: media.source.sourceType,
      id: media.source.resourceId,
    }));
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTraining('non-existing-id', input),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
