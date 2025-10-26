import type { Config } from 'jest'
import { createDefaultEsmPreset } from 'ts-jest'

export default {
  ...createDefaultEsmPreset(),
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
  ],
} satisfies Config;
