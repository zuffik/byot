module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/react-native/cleanup-after-each',
    './src/setupTests.js'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  preset: "@testing-library/react-native",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|@ui-kitten|@byot)"
  ]
};
