import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { mockRepository } from '../../test/proxy.mock';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import { TokenType } from '../../graphql/ts/types';
import * as moment from 'moment';
import { SeedModule } from '../../seed/seed.module';
import { timestampToDateTime } from '../../helpers/TimestampToDateTime';

describe('TokenService', () => {
  let service: TokenService;
  let tokenRepository: Repository<Token>;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        TokenService,
        {
          provide: getRepositoryToken(Token),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    tokenRepository = module.get<Repository<Token>>(getRepositoryToken(Token));
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(ormGenerator).toBeDefined();
  });

  it('should create token for user', async () => {
    const token = ormGenerator.token();
    const spyCreate = jest
      .spyOn(tokenRepository, 'create')
      .mockImplementation(() => token);
    const spySave = jest.spyOn(tokenRepository, 'insert');
    const user = ormGenerator.user();
    const type = TokenType.EMAIL_CONFIRMATION;
    const validUntil = moment();
    await service.create(user, type, validUntil);
    expect(spyCreate).toBeCalledWith({
      user,
      tokenType: type,
      validUntil: timestampToDateTime(validUntil),
      token: expect.any(String),
    });
    expect(spySave).toBeCalledWith(token);
  });

  it('should successfully resolve token', async () => {
    const tokenString = 'token-string';
    const tokenOrm = ormGenerator.token();
    tokenOrm.validUntil = timestampToDateTime(moment().add(1, 'month'));
    tokenOrm.valid = true;
    const spyFind = jest
      .spyOn(tokenRepository, 'findOne')
      .mockImplementation(async () => tokenOrm);
    const spySave = jest
      .spyOn(tokenRepository, 'save')
      .mockImplementation(async () => tokenOrm);
    expect(await service.resolve(tokenString)).toEqual({
      ...tokenOrm,
      valid: false,
    });
    expect(spyFind).toBeCalledWith({
      where: [
        {
          token: tokenString,
          validUntil: MoreThanOrEqual(expect.any(moment)),
          valid: true,
        },
        {
          token: tokenString,
          validUntil: null,
          valid: true,
        },
      ],
    });
    expect(spySave).toBeCalledWith({
      ...tokenOrm,
      valid: false,
    });
  });

  it('should fail resolving token', async () => {
    const tokenString = 'token-string';
    const tokenOrm = ormGenerator.token();
    tokenOrm.validUntil = timestampToDateTime(moment().add(1, 'month'));
    tokenOrm.valid = true;
    const spyFind = jest
      .spyOn(tokenRepository, 'findOne')
      .mockImplementation(async () => undefined);
    const spySave = jest.spyOn(tokenRepository, 'save');
    expect(await service.resolve(tokenString)).toBeUndefined();
    expect(spyFind).toBeCalledWith({
      where: [
        {
          token: tokenString,
          validUntil: MoreThanOrEqual(expect.any(moment)),
          valid: true,
        },
        {
          token: tokenString,
          validUntil: null,
          valid: true,
        },
      ],
    });
    expect(spySave).not.toBeCalled();
  });
});
