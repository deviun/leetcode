module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'no-restricted-syntax': ['off', { selector: 'ForOfStatement' }],
    'no-console': ['off'],
    'no-underscore-dangle': ['off'],
    'no-multi-assign': ['off'],
    'no-continue': ['off'],
  },
};
