const base = {
  clearMocks: true,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest-setup-file.ts'],
  transformIgnorePatterns: ['/node_modules/(?!celebrate/)'],
  transform: {
    '^.+\\.[tj]s$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: { syntax: 'typescript', decorators: true },
          transform: { legacyDecorator: true, decoratorMetadata: true },
        },
        module: { type: 'commonjs' },
      },
    ],
  },
};

module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text-summary'],
  projects: [
    { ...base, displayName: 'unit', testMatch: ['<rootDir>/__tests__/units/**/*.spec.ts'] },
    {
      ...base,
      displayName: 'integration',
      testMatch: ['<rootDir>/__tests__/integration/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/jest-integration-setup.ts'],
    },
  ],
};
