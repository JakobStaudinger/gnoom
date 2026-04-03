export default {
  testEnvironment: 'node',
  transform: {
    '\\.ts$': ['ts-jest', { tsconfig: './tsconfig.spec.json' }]
  },
  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  }
};
