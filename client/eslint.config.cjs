const path = require('path')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-fallthrough': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
]
