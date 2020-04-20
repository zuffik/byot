import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { testUser } from '../test/user.tester';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SeedModule } from '../seed/seed.module';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAndCount: jest.fn(async () => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should fetch all users', async () => {
    const spy = jest.spyOn(repository, 'findAndCount');
    const [users, count] = await service.findAndCount();
    expect(typeof count).toEqual('number');
    expect(Array.isArray(users)).toBeTruthy();
    users.forEach(testUser);
    expect(spy).toBeCalledWith({});
  });
});
