export default {
  testEnvironment: 'node',
  transform: {
    '\\.ts$': [
      'ts-jest',
      { tsconfig: './tsconfig.spec.json', diagnostics: { warnOnly: false } }
    ]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  }
};
