import { Args } from './Args';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { spawn } from 'child_process';

async function main(args: Args) {
  const project = path.join(
    process.cwd(),
    '..',
    'frontend',
    'web',
    args.project,
    'public'
  );
  const faviconDir = path.join(args.workingDirectory, 'favicon');
  const bin = path.join(process.cwd(), 'node_modules', '.bin');
  const files = await new Promise<string[]>((resolve, reject) => {
    glob(path.join(faviconDir, 'images') + path.sep + '*', (e, files) => {
      if (e) reject(e);
      else {
        resolve(files);
      }
    });
  });
  files.forEach((file) =>
    fs.copyFileSync(
      file,
      path.join(project, file.substr(file.lastIndexOf(path.sep)))
    )
  );
  await new Promise((resolve, reject) => {
    const proc = spawn(path.join(bin, 'real-favicon'), [
      'inject',
      path.join(faviconDir, 'data.json'),
      path.join(faviconDir, 'images'),
      path.join(project, 'index.html'),
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
