#!/usr/bin/env node

const glob = require('glob');
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCENARIOS_PATH = path.join(__dirname, '..', '..', '..', 'common', 'test', 'scenarios');
const OUTPUT_DIRECTORY = path.join(__dirname, 'cypress', 'integration', 'scenarios');

glob(SCENARIOS_PATH + '/**/*.feature', (err, f) => {
  const files = f.map(file => file.replace(SCENARIOS_PATH, '').slice(1));
  for (let file of files) {
    const source = path.join(SCENARIOS_PATH, file);
    const destination = path.join(OUTPUT_DIRECTORY, file);
    const destinationDirectory = destination.slice(0, destination.lastIndexOf(path.sep));
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }
    if (!fs.existsSync(destination)) {
      fs.symlinkSync(source, destination);
    }
  }
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
