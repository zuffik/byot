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
  })
  .help('h').argv;

export type Args = typeof args;
