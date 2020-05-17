const {override, addDecoratorsLegacy, } = require('customize-cra');
const loadCommonEnvFiles = require('./LoadCommonEnvFiles');
const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces');

module.exports = override(
  addDecoratorsLegacy(),
  loadCommonEnvFiles(),
  rewireYarnWorkspaces,
)
