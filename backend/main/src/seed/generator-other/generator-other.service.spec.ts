import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorOtherService } from './generator-other.service';
import { testJwtUser } from '../../test/jwt-user.tester';

describe('GeneratorOtherService', () => {
  let service: GeneratorOtherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorOtherService],
    }).compile();

    service = module.get<GeneratorOtherService>(GeneratorOtherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate jwt user', () => {
    const user = service.jwtUser();
    testJwtUser(user);
  });
});
