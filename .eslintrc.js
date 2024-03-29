'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': ['warn', {allow: ['error', 'warn']}],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {mocha: true},
    },
  ],
};
