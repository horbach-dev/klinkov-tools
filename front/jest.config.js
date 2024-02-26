/* eslint-env node */
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['json', 'text'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRegex: ['src\\/.*\\/__tests__\\/.*(-test)\\.[jt]sx?$'],
  unmockedModulePathPatterns: ['./node_modules/jasmine-terminal-reporter'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/SCSSStub.js',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^\\$lib(.*)$': '<rootDir>/lib/$1',
    '^\\$(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    __CONFIG__: '<rootDir>/src/config.js',
    breakpoints: '<rootDir>/src/config/webpack/breakpoints.json',
  },
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest",
  },
}
