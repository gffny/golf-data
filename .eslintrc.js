module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    browser: 'readonly',
    Buffer: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_|^req|^res|^next' }],
    'no-undef': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    semi: 'off',
  },
}
