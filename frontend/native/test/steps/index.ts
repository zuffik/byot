import {config} from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const root = path.join(__dirname, '..');
['.local', '', '.common'].reduce((env, suffix) => {
  const file = path.join(root, `.env${suffix}`);
  if (!fs.existsSync(file)) return env;
  const result = config({path: file});
  if (result.error) throw result.error;
  return {...env, ...result.parsed};
}, process.env);

const requireContext = require('node-require-context');

const context = requireContext('.', true, /\.spec\.ts$/);
context.keys().forEach((moduleId: string) => context(moduleId));
