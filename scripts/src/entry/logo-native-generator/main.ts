import { Args } from './Args';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';

async function main(args: Args) {
  /**
   * Just copy and add white BG
   */
  const src = path.join(args.workingDirectory, 'raw', 'converted');
  const dst = path.join(args.workingDirectory, 'native');

  const originalIconSize = 1024;
  const iconSize = Math.floor(originalIconSize / 0.75);
  const offset = Math.floor((iconSize - originalIconSize) / 2);
  const icon = new PNG({
    width: iconSize,
    height: iconSize,
    bgColor: { red: 255, green: 255, blue: 255 },
    colorType: 2,
  });
  fs.createReadStream(path.join(src, 'native-icon.png'))
    .pipe(new PNG())
    .on('parsed', function () {
      this.bitblt(
        icon,
        0,
        0,
        originalIconSize,
        originalIconSize,
        offset,
        offset
      );
      icon.pack().pipe(fs.createWriteStream(path.join(dst, 'native-icon.png')));
    });

  const splashSize = 3000;
  const splash = new PNG({
    width: splashSize,
    height: splashSize,
    bgColor: { red: 255, green: 255, blue: 255 },
    colorType: 2,
  });
  fs.createReadStream(path.join(src, 'native-splash.png'))
    .pipe(new PNG())
    .on('parsed', function () {
      this.bitblt(
        splash,
        0,
        0,
        this.width,
        this.height,
        splashSize / 2 - this.width / 2,
        splashSize / 2 - this.height / 2
      );
      splash
        .pack()
        .pipe(fs.createWriteStream(path.join(dst, 'native-splash.png')));
    });
}

if (require.main === module) {
  main(require('./Args').args).catch((e) => console.error(e));
}
