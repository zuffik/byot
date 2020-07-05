import { imageSize } from 'image-size';
import path from 'path';
import fs from 'fs';

export const generateMetaData = (
  files: string[],
  output: string
): Promise<string>[] =>
  files.map(
    (file) =>
      new Promise<string>((resolve, reject) =>
        imageSize(file, (e, r) => {
          if (e) {
            return reject(e);
          }
          const p = path.join(
            output,
            file
              .substr(file.lastIndexOf(path.sep))
              .replace(/\.(svg|png|jpe?g)$/, '-$1.json')
          );
          fs.writeFileSync(p, JSON.stringify(r));
          resolve(p);
        })
      )
  );
