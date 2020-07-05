import { Args } from './Args';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';
import { generateAppIcon } from './GenerateAppIcon';
import { generateSplashScreen } from './GenerateSplashScreen';

async function main(args: Args) {
  /**
   * Just copy and add white BG
   */
  const src = path.join(args.workingDirectory, 'raw', 'converted');
  const dst = path.join(args.workingDirectory, 'native');

  generateAppIcon(src, dst, 'android');
  generateAppIcon(src, dst, 'ios');
  generateSplashScreen(src, dst);
}

if (require.main === module) {
  main(require('./Args').args).catch((e) => console.error(e));
}
