module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx', 'autofix', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      ...require('eslint-plugin-jest').configs.recommended,
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
