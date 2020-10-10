#!/usr/bin/env node

const glob = require('glob');
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCENARIOS_PATHS = [
    path.join(__dirname, '..', '..', '..', 'common', 'test', 'scenarios'),
    path.join(__dirname, '..', '..', 'common', 'test', 'scenarios'),
];
const OUTPUT_DIRECTORY = path.join(__dirname, 'cypress', 'integration', 'scenarios');

SCENARIOS_PATHS.map(p => {
  glob(p + '/**/*.feature', (err, f) => {
    const files = f.map(file => file.replace(p, '').slice(1));
    const cwd = process.cwd();
    for (let file of files) {
      const source = path.join(p, file);
      const destination = path.join(OUTPUT_DIRECTORY, file);
      const destinationDirectory = destination.slice(0, destination.lastIndexOf(path.sep));
      if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
      }
      if (!fs.existsSync(destination)) {
        process.chdir(path.dirname(destination));
        fs.symlinkSync(path.relative(process.cwd(), source), destination);
      }
    }
    process.chdir(cwd);
    spawnSync('npx', [
      'cucumber-generator',
      '--includeDirectory',
      '-f',
      OUTPUT_DIRECTORY,
      '--outputDirectory',
      OUTPUT_DIRECTORY,
      '--output',
      'file',
      '--template',
      'cypress-cucumber-preprocessor'
    ], {
      stdio: 'inherit'
    });
  });
});
