import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { TokenType } from '../../graphql/ts/types';
import * as moment from 'moment';
import { timestampToDateTime } from '../../helpers/TimestampToDateTime';
import { nanoid } from 'nanoid';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public async create(
    user: User,
    tokenType: TokenType,
    validUntil?: moment.Moment,
  ): Promise<Token> {
    const token = this.tokenRepository.create({
      user,
      tokenType,
      token: nanoid(32),
      validUntil: validUntil ? timestampToDateTime(validUntil) : null,
    });
    await this.tokenRepository.save(token);
    return token;
  }

  public async resolve(tokenString: string): Promise<Token | undefined> {
    const token = await this.tokenRepository.findOne({
      relations: ['user'],
      where: {
        token: tokenString,
        valid: true,
      },
    });
    if (
      !token ||
      (token.validUntil && moment(token.validUntil.iso) < moment())
    ) {
      return undefined;
    }
    token.valid = false;
    return await this.tokenRepository.save(token);
  }
}
