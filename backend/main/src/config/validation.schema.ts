import * as Joi from '@hapi/joi';
import { Verbosity } from '../helpers/Verbosity';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  CI: Joi.bool().default(false),
  VERBOSITY: Joi.number()
    .optional()
    .valid(
      Verbosity.SILENT,
      Verbosity.ERRORS,
      Verbosity.DEBUG,
      Verbosity.VERBOSE,
      Verbosity.WARNINGS,
    ),

  CREDENTIALS_API_KEY_GOOGLE_YOUTUBE: Joi.string().required(),

  APP_PORT: Joi.number().default(3000),
  APP_SECRET: Joi.string().required(),
  APP_SUPER_ADMIN_USERNAME: Joi.string().required(),
  APP_SUPER_ADMIN_EMAIL: Joi.string().email().required(),
  APP_SUPER_ADMIN_PASSWORD: Joi.string().required(),
  APP_DEMO_USER_PASSWORD: Joi.string().required(),
  APP_DEMO_USER_EMAIL: Joi.string().required(),
  APP_TEST_USER_PASSWORD: Joi.string().required(),
  APP_TEST_USER_EMAIL: Joi.string().required(),

  SQL_SCHEME: Joi.string().valid('mysql').default('mysql'),
  SQL_HOST: Joi.string().default('localhost'),
  SQL_PORT: Joi.number().default(3306),
  SQL_USER: Joi.string().default('root'),
  SQL_PASS: Joi.string().default(''),
  SQL_NAME: Joi.string().required(),

  MAIL_SMTP_HOST: Joi.string().required(),
  MAIL_SMTP_PORT: Joi.string().required(),
  MAIL_SMTP_USERNAME: Joi.string().required(),
  MAIL_SMTP_PASSWORD: Joi.string().required(),
  MAIL_PREVIEW: Joi.bool().default(true),
});
