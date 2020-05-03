import { INestApplication } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { createApp, destroyApp } from './helpers/module.helper';
import { graphQLInteraction } from './helpers/interaction';
import { loginTestUser, makeGraphQLRequest } from './helpers/http.helper';
import { Role } from '../src/graphql/ts/types';
import { testList } from '../src/test/list.tester';
import { testTrainingSet } from '../src/test/training-set.tester';
import { TrainingSetService } from '../src/training/training-set/training-set.service';

describe('Training Set integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let gqlGenerator: GeneratorGraphqlService;
  let trainingSetService: TrainingSetService;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    trainingSetService = app.get<TrainingSetService>(TrainingSetService);
  });

  it('should contain valid structure', async () => {
    expect(gqlGenerator).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allTrainingSets');
    expect(graphQLInteraction).toHaveProperty('trainingSet');
    expect(graphQLInteraction).toHaveProperty('createTrainingSet');
    expect(graphQLInteraction).toHaveProperty('updateTrainingSet');
    // expect(graphQLInteraction).toHaveProperty('removeTrainingSet');
  });

  it('should fetch training sets as admin', async () => {
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.allTrainingSets({
        pagination: {
          offset: 0,
          limit: 10,
        },
      }),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    testList(result.body.data.allTrainingSets, testTrainingSet);
  });

  it('should fetch training sets as user', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.allTrainingSets(),
      { token: auth.token },
    );
    expect(result.body.errors).toBeUndefined();
    testList(result.body.data.allTrainingSets, testTrainingSet);
    result.body.data.allTrainingSets.entries.forEach((ts) =>
      expect(ts.owner.id).toEqual(auth.user.id),
    );
  });

  it('should fetch training set as admin', async () => {
    const [[ts]] = await trainingSetService.findAndCount({
      pagination: { limit: 1 },
    });
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(ts.id),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    await testTrainingSet(result.body.data.trainingSet);
    expect(result.body.data.trainingSet.id).toEqual(ts.id);
  });

  it('should fetch training set as owner', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const [[ts]] = await trainingSetService.findAndCount({
      pagination: { limit: 1 },
      idUser: auth.user.id,
    });
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(ts.id),
      { token: auth.token },
    );
    expect(result.body.errors).toBeUndefined();
    await testTrainingSet(result.body.data.trainingSet);
    expect(result.body.data.trainingSet.id).toEqual(ts.id);
  });

  it('should fail fetching non-existing training set', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet('some-id'),
      { token: auth.token },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fail fetching training set as non-owner', async () => {
    const demo1 = await loginTestUser(app, Role.USER);
    const demo2 = await loginTestUser(app, Role.USER, 2);
    const [[ts]] = await trainingSetService.findAndCount({
      pagination: { limit: 1 },
      idUser: demo2.user.id,
    });
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(ts.id),
      { token: demo1.token },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should create training set', async () => {
    const input = gqlGenerator.trainingSetInput();
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTrainingSet(input),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.createTrainingSet.label).toEqual(input.label);
    await testTrainingSet(result.body.data.createTrainingSet);
  });

  it('should update training set as admin', async () => {
    const input = gqlGenerator.trainingSetInput();
    const create = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTrainingSet(input),
      { userRole: Role.USER },
    );
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTrainingSet(
        create.body.data.createTrainingSet.id,
        input,
      ),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.updateTrainingSet.label).toEqual(input.label);
    await testTrainingSet(result.body.data.updateTrainingSet);
  });

  it('should update training set as owner', async () => {
    const input = gqlGenerator.trainingSetInput();
    const create = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTrainingSet(input),
      { userRole: Role.USER },
    );
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTrainingSet(
        create.body.data.createTrainingSet.id,
        input,
      ),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.updateTrainingSet.label).toEqual(input.label);
    await testTrainingSet(result.body.data.updateTrainingSet);
  });

  it('should fail updating training set as non-owner', async () => {
    const input = gqlGenerator.trainingSetInput();
    const create = await makeGraphQLRequest(
      app,
      graphQLInteraction.createTrainingSet(input),
      { userRole: Role.USER },
    );
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTrainingSet(
        create.body.data.createTrainingSet.id,
        input,
      ),
      { userRole: Role.USER, demoAccount: 2 },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should fail updating non-existing training set', async () => {
    const input = gqlGenerator.trainingSetInput();
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.updateTrainingSet('non-existing-id', input),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should remove training set as admin', async () => {
    const [trainingSet] = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.ADMIN },
      )
    ).body.data.allTrainingSets.entries;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.removeTrainingSet(trainingSet.id),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toBeUndefined();
    await testTrainingSet(result.body.data.removeTrainingSet);
    const ts = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(trainingSet.id),
      { userRole: Role.ADMIN },
    );
    expect(ts.body.errors).toEqual(expect.any(Array));
  });

  it('should fail removing non-existing training set as admin', async () => {
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.removeTrainingSet('non-existing-id'),
      { userRole: Role.ADMIN },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  it('should remove training set as owner', async () => {
    const [trainingSet] = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER },
      )
    ).body.data.allTrainingSets.entries;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.removeTrainingSet(trainingSet.id),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toBeUndefined();
    await testTrainingSet(result.body.data.removeTrainingSet);
    const ts = await makeGraphQLRequest(
      app,
      graphQLInteraction.trainingSet(trainingSet.id),
      { userRole: Role.USER },
    );
    expect(ts.body.errors).toEqual(expect.any(Array));
  });

  it('should fail removing training set as non-owner', async () => {
    const [trainingSet] = (
      await makeGraphQLRequest(
        app,
        graphQLInteraction.allTrainingSets({ pagination: { limit: 1 } }),
        { userRole: Role.USER, demoAccount: 3 },
      )
    ).body.data.allTrainingSets.entries;
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.removeTrainingSet(trainingSet.id),
      { userRole: Role.USER },
    );
    expect(result.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
