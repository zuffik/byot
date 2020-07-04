import { Args } from './Args';
import path from 'path';
import { spawn } from 'child_process';

async function main(args: Args) {
  const icons = path.join(args.workingDirectory, 'native');
  const rnProject = path.join(process.cwd(), '..', 'frontend', 'native', 'app');
  const rnCLI = path.join(rnProject, 'node_modules', '.bin', 'react-native');
  await Promise.all([
    new Promise((resolve, reject) => {
      const proc = spawn(
        rnCLI,
        ['set-icon', '--path', path.join(icons, 'native-icon.png')],
        {
          cwd: rnProject,
        }
      );
      proc.on('error', (e) => reject(e));
      proc.on('exit', (code) => {
        if (code == 0) {
          resolve();
        }
      });
    }),
    new Promise((resolve, reject) => {
      const proc = spawn(
        rnCLI,
        ['set-splash', '--path', path.join(icons, 'native-splash.png')],
        {
          cwd: rnProject,
        }
      );
      proc.on('error', (e) => reject(e));
      proc.on('exit', (code) => {
        if (code == 0) {
          resolve();
        }
      });
    }),
  ]);
}

if (require.main === module) {
  main(require('./Args').args).catch((e) => console.error(e));
}
