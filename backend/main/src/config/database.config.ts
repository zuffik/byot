import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('db', () => ({
  scheme: process.env.SQL_SCHEME,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  pass: process.env.SQL_PASS,
  name: process.env.SQL_NAME,
}));
