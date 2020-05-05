import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { MarkdownCompilerService } from './markdown-compiler/markdown-compiler.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): MailerOptions => ({
        transport: {
          host: cfg.get<string>('mail.smtp.host'),
          port: cfg.get<number>('mail.smtp.port'),
          auth: {
            user: cfg.get<string>('mail.smtp.username'),
            pass: cfg.get<string>('mail.smtp.password'),
          },
        },
        defaults: {
          from: `"${cfg.get<string>('shared.info.name')}" <${cfg.get<string>(
            'shared.contacts.email',
          )}>`,
          subject: cfg.get<string>('shared.info.name'),
        },
        preview: cfg.get<string>('node.env') === 'test',
        template: {
          dir: path.join(process.cwd(), 'views', 'email', 'templates'),
          adapter: new MarkdownCompilerService(),
        },
      }),
    }),
  ],
  providers: [MarkdownCompilerService],
})
export class MailModule {}
