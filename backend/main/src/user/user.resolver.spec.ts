import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { testList } from '../test/list.tester';
import { SeedModule } from '../seed/seed.module';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import { mockRepository } from '../test/proxy.mock';
import { JwtUser } from '../auth/decorators/jwt-user.decorator';
import { Role } from '../graphql/ts/types';
import { ForbiddenException } from '@nestjs/common';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  let generator: GeneratorGraphqlService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockRepository(),
        },
      ],
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
    generator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined with methods', () => {
    expect(resolver).toBeDefined();
    const properties = [
      'allUsers',
      'user',
      'me',
      'userUpdateMyself',
      'userUpdate',
    ];
    for (const prop of properties) {
      expect(resolver).toHaveProperty([prop]);
    }
  });

  it('should fetch all users', async () => {
    const spy = jest.spyOn(userService, 'findAndCount');
    const result = await resolver.allUsers();
    expect(spy).toBeCalledWith(undefined);
    testList(result);
  });

  it('should fetch all users with fulltext search', async () => {
    const query = 'query';
    const spy = jest.spyOn(userService, 'findAndCount');
    const result = await resolver.allUsers({ query });
    expect(spy).toBeCalledWith({ query });
    testList(result);
  });

  it('should fetch all users with fulltext search and pagination', async () => {
    const query = 'query';
    const pagination = { limit: 10, offset: 20 };
    const spy = jest.spyOn(userService, 'findAndCount');
    const result = await resolver.allUsers({ query, pagination });
    expect(spy).toBeCalledWith({ query, pagination });
    testList(result);
  });

  it('should fetch all users with pagination', async () => {
    const pagination = { limit: 10, offset: 20 };
    const spy = jest.spyOn(userService, 'findAndCount');
    const result = await resolver.allUsers({ pagination });
    expect(spy).toBeCalledWith({ pagination });
    testList(result);
  });

  it('should find user by id', async () => {
    const id = 'id';
    const spy = jest.spyOn(userService, 'findById');
    await resolver.user(id, {
      id,
      email: 'any',
      role: Role.USER,
    });
    expect(spy).toBeCalledWith(id);
  });

  it('should fail fetch due to invalid id', async () => {
    const id = 'id';
    await expect(resolver.user(id, {
      id: 'invalid-id',
      email: 'any',
      role: Role.USER,
    })).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should find myself', async () => {
    const id = 'id';
    const spy = jest.spyOn(userService, 'findById');
    await resolver.me({
      id,
      email: 'any',
      role: Role.USER,
    });
    expect(spy).toBeCalledWith(id);
  });
});

