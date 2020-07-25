import { Test, TestingModule } from '@nestjs/testing';
import { CleanerController } from './cleaner.controller';
import { CleanerService } from './cleaner.service';
import { proxyMock } from '../test/proxy.mock';
import { ConfigService } from '@nestjs/config';

describe('Cleaner Controller', () => {
  let controller: CleanerController;
  let service: CleanerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanerController],
      providers: [
        {
          provide: CleanerService,
          useValue: proxyMock(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key) => {
              if (key === 'app.demo.email') {
                return 'app@demo.email';
              }
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CleanerController>(CleanerController);
    service = module.get<CleanerService>(CleanerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should get email from config', async () => {
    const spy = jest.spyOn(service, 'removeUserByEmail');
    await controller.purgeUserTestData();
    expect(spy).toBeCalledWith('app@demo.email');
  });
});
