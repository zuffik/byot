import { Test, TestingModule } from '@nestjs/testing';
import { testDateTime } from '../../test/datetime.tester';
import { testUser, testUserRegister } from '../../test/user.tester';
import { GeneratorGraphqlService } from './generator-graphql.service';

describe('GeneratorGraphqlService', () => {
  let service: GeneratorGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorGraphqlService],
    }).compile();

    service = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate valid DateTime', () => {
    const dateTime = service.dateTime();
    testDateTime(dateTime);
  });

  it('should generate valid User', () => {
    const user = service.user();
    testUser(user);
  });

  it('should generate valid UserRegister', () => {
    const userRegister = service.userRegister();
    testUserRegister(userRegister);
  });
});
