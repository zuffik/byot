import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SeedModule } from '../seed/seed.module';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import * as _ from 'lodash';
import { mockRepository, proxyMock } from '../test/proxy.mock';

describe('UserService', () => {
  let service: UserService;
  let generator: GeneratorGraphqlService;
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
    generator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(generator).toBeDefined();
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
    const userToBeRegistered = generator.userRegister();
    const spySave = jest.spyOn(repository, 'save');
    await service.create(userToBeRegistered);
    expect(spySave).toBeCalled();
  });

  it('should find user by username or email', async () => {
    const usernameOrEmail = 'user';
    const spy = jest.spyOn(repository, 'findOne');
    await service.findByUsernameOrEmail(usernameOrEmail);
    expect(spy).toBeCalledWith(expect.objectContaining({
      where: expect.arrayContaining([
        expect.objectContaining({ email: usernameOrEmail }),
        expect.objectContaining({ userName: usernameOrEmail }),
      ]),
    }));
  });
});
