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
              switch (key) {
                case 'app.demo.email':
                  return 'app@demo.email';
                case 'app.test.email':
                  return 'app@test.email';
                case 'app.test.password':
                  return 'app@test.password';
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

  it('should clean email from config', async () => {
    const spy = jest.spyOn(service, 'removeUserByEmail');
    await controller.purgeUserTestData();
    expect(spy).toBeCalledWith('app@demo.email');
  });

  it('should clean created training set', async () => {
    const spy = jest.spyOn(service, 'removeLatestTrainingSetByCreator');
    await controller.purgeCreateTrainingSetData();
    expect(spy).toBeCalledWith('app@test.email', 1);
  });

  it('should clean updated training set', async () => {
    const spy = jest.spyOn(service, 'removeLatestTrainingSetByCreator');
    await controller.purgeUpdateTrainingSetData();
    expect(spy).toBeCalledWith('app@test.email', 1);
  });
});
