module.exports = {
  roots: [
    '<rootDir>/src',
    // todo when created add '<rootDir>/test'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.*\\.(test|spec)\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  setupFilesAfterEnv: ['./src/setupTests.js']
};
