// Flat ESLint config for ESLint v9 using Next.js flat preset
// See: https://nextjs.org/docs/app/building-your-application/configuring/eslint

import next from 'eslint-config-next';

export default [
  // Apply Next's recommended rules (core-web-vitals included by default)
  ...next(),
  // Project-level ignores
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/dist/**', '**/build/**'],
  },
];
