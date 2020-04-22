module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setup.tests.ts'],
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
};
