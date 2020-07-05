import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

export const generateAppIcon = (
  src: string,
  dst: string,
  platform: 'ios' | 'android'
) => {
  const originalIconSize = 1024;
  const iconSize = Math.floor(
    originalIconSize / (platform === 'ios' ? 0.75 : 0.5)
  );
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
      icon
        .pack()
        .pipe(
          fs.createWriteStream(path.join(dst, `native-icon-${platform}.png`))
        );
    });
};
