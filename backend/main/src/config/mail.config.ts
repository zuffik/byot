import { registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  smtp: {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    username: process.env.MAIL_SMTP_USERNAME,
    password: process.env.MAIL_SMTP_PASSWORD,
  },
}));
