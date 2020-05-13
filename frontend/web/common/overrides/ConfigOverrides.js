const {override, addDecoratorsLegacy} = require('customize-cra');
const loadCommonEnvFiles = require('./LoadCommonEnvFiles');

module.exports = override(
  addDecoratorsLegacy(),
  loadCommonEnvFiles(),
)
