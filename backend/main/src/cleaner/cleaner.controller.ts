import { Controller, Inject, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CleanerService } from './cleaner.service';

@Controller('cleaner')
export class CleanerController {
  constructor(
    @Inject(ConfigService) private readonly cfg: ConfigService,
    @Inject(CleanerService) private readonly cleaner: CleanerService,
  ) {}

  @Delete('test/user')
  public async purgeUserTestData() {
    await this.cleaner.removeUserByEmail(this.cfg.get('app.demo.email'));
  }
}
