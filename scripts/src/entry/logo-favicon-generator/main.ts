import { Args } from './Args';
import path from 'path';
import { spawn } from 'child_process';

async function main(args: Args) {
  const faviconDir = path.join(args.workingDirectory, 'favicon');
  const info = path.join(
    __dirname,
    '..',
    '..',
    'favicon',
    'generator-info.json'
  );
  const bin = path.join(process.cwd(), 'node_modules', '.bin');
  await new Promise((resolve, reject) => {
    const proc = spawn(path.join(bin, 'real-favicon'), [
      'generate',
      info,
      path.join(faviconDir, 'data.json'),
      path.join(faviconDir, 'images'),
    ]);
    proc.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}

if (require.main === module) {
  main(require('./Args').args).catch((e) => console.error(e));
}
