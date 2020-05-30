import * as dotenv from 'dotenv';
import * as path from 'path';

const loadConfig = (suffix: string) => {
  const e = dotenv.config({
    path: path.join(__dirname, '..', '..', `.env${suffix}`),
  });
  return e.parsed || {};
};

export const envVars = {
  ...loadConfig('.common'),
  ...loadConfig(''),
  ...loadConfig('.test'),
  ...loadConfig('.local'),
};
