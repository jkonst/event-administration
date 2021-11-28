
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const config = require('./tsconfig.spec.json');

// if your node does not support json as a module, use fs get path from tsconfig.spec.json
const paths = pathsToModuleNameMapper(config.compilerOptions.paths, { prefix: '<rootDir>/' })

// basic info, and you can add more
// https://jestjs.io/docs/configuration
module.exports = {
  preset: 'jest-preset-angular',
  //automatically clear mocks between tests
  clearMocks: true,

  // test file name matcher
  testMatch: ["**/__tests__/**/*.[tj]s", "**/*.(test|spec).[tj]s"],

  // test environment setting file
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  // test coverage, if your coverage rate it high
  collectCoverage: false,

  moduleFileExtensions: ['ts', 'js'],

  // for location.href
  testURL: 'http://localhost',

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/builds/',
  ],

  // paths
  moduleNameMapper: paths,
  globals: {
    'ts-jest': {
      'tsconfig': '<rootDir>/tsconfig.spec.json',
      'stringifyContentPathRegex': '\\.html$',
    },
  },
};
