import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { SeedModule } from '../seed/seed.module';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import { mockRepository } from '../test/proxy.mock';
import * as _ from 'lodash';
import { GeneratorOrmService } from '../seed/generator-orm/generator-orm.service';

describe('UserService', () => {
  let service: UserService;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>('UserRepository');
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
  });

  it('should fetch all users', async () => {
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount();
    expect(spy).toBeCalledWith({});
  });

  it('should fetch all users with fulltext search', async () => {
    const query = 'user';
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount({ query });
    expect(spy).toHaveBeenCalledWith({
      where: expect.arrayContaining([
        expect.objectContaining({ userName: expect.anything() }),
        expect.objectContaining({ email: expect.anything() }),
        expect.objectContaining({ firstName: expect.anything() }),
        expect.objectContaining({ lastName: expect.anything() }),
      ]),
    });
  });

  it('should fetch all users with fulltext search and pagination', async () => {
    const query = 'user';
    const limit = 10;
    const offset = 20;
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount({ query, pagination: { limit, offset } });
    expect(spy).toHaveBeenCalledWith({
      where: expect.arrayContaining([
        expect.objectContaining({ userName: expect.anything() }),
        expect.objectContaining({ email: expect.anything() }),
        expect.objectContaining({ firstName: expect.anything() }),
        expect.objectContaining({ lastName: expect.anything() }),
      ]),
      skip: offset,
      take: limit,
    });
  });

  it('should fetch all users with pagination', async () => {
    const limit = 10;
    const offset = 20;
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount({ pagination: { limit, offset } });
    expect(spy).toHaveBeenCalledWith({
      skip: offset,
      take: limit,
    });
  });

  it('should register user', async () => {
    const userToBeRegistered = gqlGenerator.userRegister();
    const spySave = jest.spyOn(repository, 'save');
    await service.create(userToBeRegistered);
    expect(spySave).toBeCalled();
  });

  it('should find user by username or email', async () => {
    const usernameOrEmail = 'user';
    const spy = jest.spyOn(repository, 'findOne');
    await service.findByUsernameOrEmail(usernameOrEmail);
    expect(spy).toBeCalledWith(
      expect.objectContaining({
        where: expect.arrayContaining([
          expect.objectContaining({ email: usernameOrEmail }),
          expect.objectContaining({ userName: usernameOrEmail }),
        ]),
      }),
    );
  });

  it('should get user by ID', async () => {
    const id = 'id';
    const spy = jest.spyOn(repository, 'findOne');
    await service.findById(id);
    expect(spy).toBeCalledWith({
      where: {
        id,
      },
    });
  });

  it('should update user', async () => {
    const id = 'id';
    const userUpdateInput = _.omit(gqlGenerator.userUpdate(), 'passwordRepeat');
    const spySave = jest.spyOn(repository, 'update').mockImplementation(
      async (): Promise<UpdateResult> => ({
        affected: 1,
        generatedMaps: [],
        raw: undefined,
      }),
    );
    const spyFind = jest.spyOn(repository, 'findOne');
    await service.update(id, userUpdateInput);
    expect(spySave).toBeCalledWith(
      {
        id,
      },
      expect.objectContaining(userUpdateInput),
    );
    expect(spyFind).toBeCalledWith({
      where: {
        id,
      },
    });
  });

  it('should fail update user', async () => {
    const id = 'id';
    const userUpdateInput = _.omit(gqlGenerator.userUpdate(), 'passwordRepeat');
    const spySave = jest.spyOn(repository, 'update').mockImplementation(
      async (): Promise<UpdateResult> => ({
        affected: 0,
        generatedMaps: [],
        raw: undefined,
      }),
    );
    const spyFind = jest.spyOn(repository, 'findOne');
    const updateResult = await service.update(id, userUpdateInput);
    expect(spySave).toBeCalledWith(
      {
        id,
      },
      expect.objectContaining(userUpdateInput),
    );
    expect(spyFind).not.toBeCalled();
    expect(updateResult).toBeUndefined();
  });

  it('should check for available email', async () => {
    const email = 'email';
    const spy = jest
      .spyOn(repository, 'count')
      .mockImplementation(async () => 0);
    expect(await service.checkEmailExists(email)).toBeFalsy();
    expect(spy).toBeCalledWith({
      where: {
        email,
      },
    });
  });

  it('should check for non available email', async () => {
    const email = 'email';
    const spy = jest
      .spyOn(repository, 'count')
      .mockImplementation(async () => 1);
    expect(await service.checkEmailExists(email)).toBeTruthy();
    expect(spy).toBeCalledWith({
      where: {
        email,
      },
    });
  });

  it('should check for available userName', async () => {
    const userName = 'userName';
    const spy = jest
      .spyOn(repository, 'count')
      .mockImplementation(async () => 0);
    expect(await service.checkUserNameExists(userName)).toBeFalsy();
    expect(spy).toBeCalledWith({
      where: {
        userName,
      },
    });
  });

  it('should check for non available userName', async () => {
    const userName = 'userName';
    const spy = jest
      .spyOn(repository, 'count')
      .mockImplementation(async () => 1);
    expect(await service.checkUserNameExists(userName)).toBeTruthy();
    expect(spy).toBeCalledWith({
      where: {
        userName,
      },
    });
  });
});
