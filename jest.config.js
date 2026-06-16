module.exports = {

  // Test execution environment
  testEnvironment: 'node',

  // Coverage report formats
  coverageReporters: [
    'lcov',
    'text'
  ],

  // Files included in coverage calculation
  collectCoverageFrom: [
    'server.js'
  ]
};