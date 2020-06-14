#!/usr/bin/env node

// todo this is copy-paste

const glob = require('glob');
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCENARIOS_PATH = path.join(__dirname, '..', '..', '..', 'common', 'test', 'scenarios');
const FEATURES_DIRECTORY = path.join(__dirname, 'features', 'scenarios');
const OUTPUT_DIRECTORY = path.join(__dirname, 'steps', 'scenarios');

glob(SCENARIOS_PATH + '/**/*.feature', (err, f) => {
  const files = f.map(file => file.replace(SCENARIOS_PATH, '').slice(1));
  for (let file of files) {
    const source = path.join(SCENARIOS_PATH, file);
    const destination = path.join(FEATURES_DIRECTORY, file);
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
    '-f',
    FEATURES_DIRECTORY,
    '--outputDirectory',
    OUTPUT_DIRECTORY,
    '--output',
    'file',
    '--template',
    'cucumber'
  ], {
    stdio: 'inherit'
  });
});
