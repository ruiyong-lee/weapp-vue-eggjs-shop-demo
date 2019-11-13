module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-param-reassign': 0,
    'max-len': [0, 80, 4],
    'object-curly-newline': ["error", { "minProperties": 6, "consistent": true }],
    indent: 0,
  },

  globals: {
    document: true,
    uni: true,
    rpx: true,
    getApp: true,
    _: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
