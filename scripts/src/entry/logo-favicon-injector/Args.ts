import yargs from 'yargs';
import path from 'path';

export const args = yargs
  .options({
    workingDirectory: {
      alias: 'w',
      default: path.join(process.cwd(), 'out'),
      defaultDescription: 'process.cwd() + out',
      type: 'string',
      describe: 'Output directory',
    },
    project: {
      alias: 'p',
      demandOption: true,
      type: 'string',
      choices: ['app', 'admin', 'landing'],
    },
  })
  .help('h').argv;

export type Args = typeof args;
