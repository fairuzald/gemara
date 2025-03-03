module.exports = {
  // ...
  extends: [
    // ...
    'plugin:astro/recommended',
  ],
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'no-unused-vars': 'off',
        'no-console': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/display-name': 'off',
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        // Unused imports
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};
