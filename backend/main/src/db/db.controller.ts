import {
  BadRequestException,
  Controller,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Controller('db')
export class DbController {
  private qr?: QueryRunner;

  constructor(
    @Inject(Connection) private connection: Connection,
    @Inject(ConfigService) private cfg: ConfigService,
  ) {}

  @Post('transaction/begin')
  public async beginTransaction() {
    if (this.cfg.get('node.env') !== 'test') {
      throw new NotFoundException();
    }
    this.qr = this.connection.createQueryRunner();
    await this.qr.startTransaction();
    return { ok: true };
  }

  @Post('transaction/rollback')
  public async rollbackTransaction() {
    if (this.cfg.get('node.env') !== 'test') {
      throw new NotFoundException();
    }
    if (!this.qr) {
      throw new BadRequestException();
    }

    await this.qr.rollbackTransaction();
    this.qr = undefined;
    return { ok: true };
  }
}
