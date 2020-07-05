import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

export const generateSplashScreen = (src: string, dst: string) => {
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
};
