const path = require('path');
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    watchFolders: [
      path.resolve(__dirname, '..', '..'),
      path.resolve(__dirname, '..', '..', '..', 'common'),
      path.resolve(__dirname, '..', '..', 'web', 'app'),
    ],
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      getTransformOptions: () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      extraNodeModules: {
        '@byot-frontend/web-app': path.resolve(__dirname, '..', '..', 'web', 'app')
      }
    }
  };
})();
