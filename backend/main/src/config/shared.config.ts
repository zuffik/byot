import { registerAs } from '@nestjs/config';
import definition from './shared.config.definitnion';

export const sharedConfig = registerAs('shared', () => definition);
