import { registerAs } from '@nestjs/config';

export const nodeConfig = registerAs('node', () => ({
  env: process.env.NODE_ENV,
}));
