import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('db', () => ({
  scheme: process.env.SQL_SCHEME || 'mysql',
  host: process.env.SQL_HOST,
  port: parseInt(process.env.SQL_PORT || '3306', 10),
  user: process.env.SQL_USER,
  pass: process.env.SQL_PASS,
  name: process.env.SQL_NAME,
}));
