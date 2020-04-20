import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            findAndCount: jest.fn(async () => [[], 0]),
          },
        },
      ],
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined with methods', () => {
    expect(resolver).toBeDefined();
    const properties = [
      'allUsers',
      'user',
      'userRegister',
      'userLogin',
      'userUpdateMyself',
      'userUpdate',
    ];
    for (const prop of properties) {
      expect(resolver).toHaveProperty([prop]);
    }
  });
});
