const {config} = require('dotenv');
const path = require('path');
const fs = require('fs');

// todo this is also copy-fuckin-paste
const root = path.join(__dirname);
['.local', '', '.common'].reduce((env, suffix) => {
  const file = path.join(root, `.env${suffix}`);
  if (!fs.existsSync(file)) return env;
  const result = config({path: file});
  if (result.error) throw result.error;
  return {...env, ...result.parsed};
}, process.env);

exports.config = {
  runner: 'local',
  port: 4723,
  specs: [
    './features/**/*.feature',
  ],
  sync: true,
  exclude: [],
  maxInstances: 10,
  capabilities: [
    process.env.ANDROID_TEST === 'true' && {
      automationName: 'UiAutomator2',
      deviceName: process.env.ANDROID_DEVICE,
      platformName: 'Android',
      platformVersion: process.env.ANDROID_VERSION,
      orientation: 'PORTRAIT',
      app: path.join(__dirname, '..', 'app', 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
      noReset: true,
      newCommandTimeout: 240,
      maxInstances: 1,
      browserName: '',
    },
    process.env.IOS_TEST === 'true' && {
      automationName: 'XCUITest',
      deviceName: process.env.IOS_DEVICE,
      platformName: 'iOS',
      platformVersion: process.env.IOS_VERSION,
      orientation: 'PORTRAIT',
      app: 'com.byot',
      noReset: true,
      newCommandTimeout: 240,
      maxInstances: 1,
      browserName: '',
    },
  ].filter(e => !!e),
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],

  framework: 'cucumber',

  cucumberOpts: {
    require: ['./steps'],
    backtrace: false,
    requireModule: [
      () => {require('@babel/register')({
        extensions: [".es6", ".es", ".jsx", ".js", ".mjs", '.ts'],
        ignore: [/node_modules\/(?!@byot)/]
      })}
    ],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    snippets: true,
    source: true,
    profile: [],
    strict: true,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
  before(capabilities, specs) {
    global.expect = require('jest-matchers');
  }
};
