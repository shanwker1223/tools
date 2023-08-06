const nxPreset = require('@nrwl/jest/preset').default;


module.exports = {
    ...nxPreset,
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.ts',
      '!**/jest.config.ts',
      '!src/index.ts',
      '!src/lib/**/index.ts',
    ],
    coverageReporters: ['html'],
    coverageThreshold: {
      global: {
        lines: 100,
        branches: 100
      },
    },
};
