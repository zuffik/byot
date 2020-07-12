import argv from 'yargs';
import * as path from 'path';

export const args = argv
  .showHelpOnFail(true)
  .help('h')
  .options({
    height: {
      alias: 'H',
      default: 320,
      type: 'number',
    },
    strokeWidth: {
      alias: 'S',
      default: 32,
      type: 'number',
    },
    offset: {
      alias: 'O',
      default: 16,
      type: 'number',
    },
    workingDirectory: {
      alias: 'w',
      default: path.join(process.cwd(), 'out'),
      defaultDescription: 'process.cwd() + out',
      type: 'string',
      describe: 'Output directory',
    },
    optimize: {
      alias: 'p',
      type: 'boolean',
      default: false,
      describe: 'Optimize output file',
    },
    pretty: {
      type: 'boolean',
      alias: 'r',
      default: false,
      describe: 'Pretty print optimized SVG',
    },
    help: {
      alias: 'h',
      type: 'boolean',
    },
    gradient: {
      alias: 'g',
      type: 'boolean',
      default: true,
      description: 'Generate using main gradient',
    },
    color: {
      alias: 'c',
      type: 'string',
      description:
        'If generating logo without gradient, this color will be used for entire logo (this can be either color or "primary", "secondary)"',
      default: 'primary',
    },
  }).argv;

export type Args = typeof args;
