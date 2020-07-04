import * as path from 'path';
import { Args } from './Args';
import { optimizeSVGs } from './OptimizeSvg';
import { svgToPng } from './SvgToPng';
import { recreateDirectory } from '../../helpers/RecreateDirectory';
import { generateFaviconLogo } from '../../logo/generators/GenerateFaviconLogo';
import { generateNativeLogo } from '../../logo/generators/GenerateNativeLogo';
import { generateFullLogo } from '../../logo/generators/GenerateFullLogo';
import { createSvgFile } from '../../helpers/CreateSvgFile';
import { createDirectories } from '../../helpers/CreateDirectories';
import chalk from 'chalk';

async function main(args: Args) {
  const variants: ('favicon' | 'native')[] = ['favicon', 'native'];
  const { workingDirectory } = args;
  const workingSubdirectories = Object.assign(
    {
      raw: {
        generated: path.join(workingDirectory, 'raw', 'generated'),
        optimized: path.join(workingDirectory, 'raw', 'optimized'),
        converted: path.join(workingDirectory, 'raw', 'converted'),
      },
    },
    ...variants.map((wd) => ({ [wd]: path.join(workingDirectory, wd) }))
  );
  await recreateDirectory(workingDirectory);
  createDirectories(workingSubdirectories);

  const full = generateFullLogo(args.strokeWidth, args.offset, args.height);
  const favicon = generateFaviconLogo(
    args.strokeWidth,
    args.offset,
    args.height
  );
  const native = generateNativeLogo(args.strokeWidth, args.offset, args.height);

  const raw: string[] = [
    ...full.map((o) => createSvgFile(workingSubdirectories.raw.generated, o)),
    ...favicon.map((o) =>
      createSvgFile(workingSubdirectories.raw.generated, o)
    ),
    ...native.map((o) => createSvgFile(workingSubdirectories.raw.generated, o)),
  ];

  let optimized: string[] = [];
  if (args.p && raw.length > 0) {
    optimized = await Promise.all(
      optimizeSVGs(raw, workingSubdirectories.raw.optimized, {
        pretty: args.pretty,
        async: true,
      })
    );
  }
  const PNGs = await Promise.all(
    svgToPng(raw, workingSubdirectories.raw.converted)
  );
  console.log(chalk.green.bold('Raw:'));
  raw.forEach((f) =>
    console.log(chalk.gray('.' + f.replace(args.workingDirectory, '')))
  );
  console.log();
  console.log(chalk.green.bold('Optimized:'));
  optimized.forEach((f) =>
    console.log(chalk.gray('.' + f.replace(args.workingDirectory, '')))
  );
  console.log();
  console.log(chalk.green.bold('Converted:'));
  PNGs.forEach((f) =>
    console.log(chalk.gray('.' + f.replace(args.workingDirectory, '')))
  );
  console.log();
}

if (require.main === module) {
  main(require('./Args').args).catch((e) => console.error(e));
}
