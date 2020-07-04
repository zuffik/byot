const override = require('../../common/overrides/ConfigOverrides');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    'storybook-addon-material-ui/register',
    'storybook-addon-i18next/register'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]]
      }
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config = override(config);
    return config;
  }
};
