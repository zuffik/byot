import argv from 'yargs';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import { logoGenerate } from './src/logo/LogoGenerate';
// @ts-ignore
import { convertFile } from 'convert-svg-to-png';
import rimraf from 'rimraf';

async function main() {
  const args = argv
    .showHelpOnFail(true)
    .alias('V', 'variant')
    .choices('V', ['full', 'favicon', 'both'])
    .alias('H', 'height')
    .default('H', 320)
    .alias('S', 'strokeWidth')
    .default('S', 32)
    .alias('O', 'offset')
    .default('O', 16)
    .alias('o', 'output')
    .default('o', 'stdio')
    .describe('o', 'Output directory')
    .alias('p', 'optimize')
    .default('p', false)
    .boolean('p')
    .describe('p', 'Optimize output file (only if output is file)')
    .alias('r', 'pretty')
    .default('r', false)
    .boolean('r')
    .describe('r', 'Pretty print optimized SVG')
    .alias('h', 'help')
    .help('h')
    .demandOption('V').argv;
  let full: string | undefined = undefined,
    faviconBg: string | undefined = undefined,
    faviconNoBg: string | undefined = undefined;
  const isFull = ['full', 'both'].includes(args.V);
  const isFavicon = ['favicon', 'both'].includes(args.V);

  if (isFull) {
    console.log('Generating variant: full');
    full = logoGenerate(args.S, args.O, args.H, true);
  }
  if (isFavicon) {
    console.log('Generating variant: favicon without background');
    faviconNoBg = logoGenerate(args.S, args.O, args.H, false);
    console.log('Generating variant: favicon with background');
    faviconBg = logoGenerate(args.S, args.O, args.H, false, true);
  }
  const variants = { full, faviconBg, faviconNoBg };
  if (args.o === 'stdio') {
    console.log(variants);
  } else {
    const generated = [];
    const dir = args.o;
    const prefix = 'byoT';
    await new Promise((res, rej) => {
      rimraf(dir, (e) => {
        if (e) rej(e);
        else res();
      });
    });
    fs.mkdirSync(dir, { recursive: true });
    if (!fs.lstatSync(dir).isDirectory()) {
      throw new Error(`'${dir}' must be a directory.`);
    }
    if (isFull) {
      const file = path.join(dir, `${prefix}-full`);
      generated.push(file);
      fs.writeFileSync(`${file}.svg`, variants.full);
    }
    if (isFavicon) {
      let file = path.join(dir, `${prefix}-favicon-with-bg`);
      generated.push(file);
      fs.writeFileSync(`${file}.svg`, variants.faviconBg);
      file = path.join(dir, `${prefix}-favicon-without-bg`);
      generated.push(file);
      fs.writeFileSync(`${file}.svg`, variants.faviconNoBg);
    }
    if (args.p && generated.length > 0) {
      generated.forEach((file) => {
        const params = [`${file}.svg`];
        if (args.r) {
          params.push('--pretty');
        }
        cp.spawnSync(path.join(__dirname, 'node_modules/.bin/svgo'), params, {
          stdio: 'inherit',
        });
      });
    }
    await Promise.all(
      generated.map((file) =>
        convertFile(`${file}.svg`, {
          puppeteer: {
            headless: true,
            args: ['--no-sandbox'],
          },
        })
      )
    );
  }
}

if (require.main === module) {
  main();
}
