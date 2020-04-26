import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { proxyMock } from '../test/proxy.mock';
import { SeedModule } from '../seed/seed.module';
import { GeneratorOrmService } from '../seed/generator-orm/generator-orm.service';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import { User } from '../user/user.entity';
import { BadRequestException } from '@nestjs/common';
import { Role } from '../graphql/ts/types';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;
  let ormGenerator: GeneratorOrmService;
  let gqlGenerator: GeneratorGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: proxyMock(),
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(authService).toBeDefined();
    expect(ormGenerator).toBeDefined();
    expect(gqlGenerator).toBeDefined();
  });

  it('should register and authenticate user', async () => {
    const userRegister = gqlGenerator.userRegister();
    const spyAuth = jest
      .spyOn(authService, 'createUser')
      .mockImplementation(async () => ({
        user: ormGenerator.user(),
        token: '',
      }));
    const auth = await resolver.userRegister(userRegister);
    expect(spyAuth).toBeCalledWith(userRegister);
    expect(auth).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    );
  });

  it('should update myself', async () => {
    const id = 'id';
    const userUpdateInput = gqlGenerator.userUpdate();
    const spy = jest
      .spyOn(authService, 'updateUser')
      .mockImplementation(async () => new User());
    await resolver.userUpdateMyself(userUpdateInput, {
      id,
      email: 'any',
      role: Role.USER,
    });
    expect(spy).toBeCalledWith(id, userUpdateInput);
  });

  it('should fail update myself due to non-matching password', async () => {
    const id = 'id';
    const userUpdateInput = gqlGenerator.userUpdate(false);
    jest
      .spyOn(authService, 'updateUser')
      .mockImplementation(async () => new User());
    userUpdateInput.password = 'pwd';
    userUpdateInput.passwordRepeat = '';
    await expect(
      resolver.userUpdateMyself(userUpdateInput, {
        id,
        email: 'any',
        role: Role.USER,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
