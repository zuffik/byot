import cp from 'child_process';
import * as path from 'path';

export function optimizeSVGs(
  files: string[],
  output: string,
  options?: { pretty?: boolean; async?: false }
): string[];
export function optimizeSVGs(
  files: string[],
  output: string,
  options?: { pretty?: boolean; async?: true }
): Promise<string>[];
export function optimizeSVGs(
  files: string[],
  output: string,
  { pretty = false, async = false } = {}
) {
  const params = (file: string) => {
    const params = [
      file,
      '--config',
      '{ "plugins": [{ "removeViewBox": false }, { "removeDimensions": false }] }',
      '--output',
      output,
    ];
    if (pretty) {
      params.push('--pretty');
    }
    return params;
  };
  const bin = path.join(process.cwd(), 'node_modules', '.bin', 'svgo');
  if (!async) {
    return files.map((file) => {
      cp.spawnSync(bin, params(file), {
        stdio: 'inherit',
      });
      return file;
    });
  } else {
    return files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const proc = cp.spawn(bin, params(file), {
            stdio: 'ignore',
          });
          proc.on('exit', (code, signal) => {
            if (code === 0) {
              resolve(
                path.join(output, file.substr(file.lastIndexOf(path.sep)))
              );
            } else {
              reject({ code, signal });
            }
          });
        })
    );
  }
}
