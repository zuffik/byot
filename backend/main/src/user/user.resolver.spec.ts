import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { testList } from '../test/list.tester';
import { SeedModule } from '../seed/seed.module';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import { mockRepository } from '../test/proxy.mock';

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
});
