// @ts-ignore
import { convertFile } from 'convert-svg-to-png';
import * as path from 'path';

export const svgToPng = (files: string[], output: string): Promise<string>[] =>
  files.map((file) =>
    convertFile(file, {
      puppeteer: {
        headless: true,
        args: ['--no-sandbox'],
      },
      height: 1024,
      outputFilePath: path.join(
        output,
        `${file.substr(file.lastIndexOf(path.sep)).replace(/\.svg$/, '')}.png`
      ),
    })
  );
