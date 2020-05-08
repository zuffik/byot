import { registerAs } from '@nestjs/config';
import { Verbosity } from '../helpers/Verbosity';

export const nodeConfig = registerAs('node', () => ({
  env: process.env.NODE_ENV,
  ci: process.env.CI,
  verbosity:
    process.env.VERBOSITY ||
    {
      development: Verbosity.DEBUG,
      production: Verbosity.ERRORS,
      test: Verbosity.SILENT,
    }[process.env.NODE_ENV],
}));
