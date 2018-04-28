const path = require('path');

// This is largely inspired by createJestConfig.js from react-scripts-ts
// Note that we are dependent on the above for polyfills
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    `!**/**/*.mock.*`
  ],
  coverageDirectory: './reports/tests/coverage',
  setupFiles: [path.resolve(__dirname,'node_modules/react-scripts-ts/config/polyfills')],
  testMatch: [
    `${__dirname}/src/**/__tests__/**/*.(j|t)s?(x)`,
    `${__dirname}/src/**/?(*.)(spec|test).(j|t)s?(x)`,
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testResultsProcessor: "jest-junit",
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest/preprocessor',
    '^.+\\.css$': 'jest-css',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': 'jest-file',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'js',
    'web.jsx',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json',
    },
  },
};
