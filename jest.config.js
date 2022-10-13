module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  // transformIgnorePatterns:['node_modules', 'src/config', 'src/app.js', 'tests', 'src/public','src/views'],
  modulePathIgnorePatterns: ['node_modules', 'src/public', 'src/views'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
