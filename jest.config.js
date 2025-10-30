const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {  // CORREÇÃO AQUI: moduleNameMapping -> moduleNameMapper
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testMatch: [
    '<rootDir>/src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
};

module.exports = createJestConfig(customJestConfig);