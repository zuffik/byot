const parseCommonEnvFiles = require('../../../common/src/env/ParseCommonEnvFiles');
const _ = require('lodash');

const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find(plugin => plugin.constructor.name === pluginName);

const overrideProcessEnv = env => config => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ..._.mapValues(env, v => _.isNumber(v) ? v : `"${v}"`),
  };

  return config;
};

module.exports = () => overrideProcessEnv(parseCommonEnvFiles());
