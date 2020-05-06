import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
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
    await this.tokenRepository.insert(token);
    return token;
  }

  public async resolve(tokenString: string): Promise<Token | undefined> {
    const where = {
      token: tokenString,
      valid: true,
    };
    const token = await this.tokenRepository.findOne({
      where: [
        {
          ...where,
          validUntil: MoreThanOrEqual(moment()),
        },
        {
          ...where,
          validUntil: null,
        },
      ],
    });
    if (!token) {
      return undefined;
    }
    token.valid = false;
    return await this.tokenRepository.save(token);
  }
}
