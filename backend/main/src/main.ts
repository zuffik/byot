import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: /(127\.0\.0\.1|localhost):(\d+)/ });
  const port = configService.get<number>('app.port');
  await app.listen(port);
}
bootstrap();
