import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorOrmService } from './generator-orm.service';
import { testUser } from '../../test/user.tester';
import { GeneratorGraphqlService } from '../generator-graphql/generator-graphql.service';

describe('GeneratorOrmService', () => {
  let service: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorOrmService, GeneratorGraphqlService],
    }).compile();

    service = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate valid user', () => {
    const user = service.user();
    testUser(user);
    expect(user).toHaveProperty('password');
  });
});
