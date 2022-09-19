module.exports = {
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.js', '*.json'],
      extends: ['plugin:react/recommended', './node_modules/gts'],
      plugins: ['react', 'react-hooks', 'jest', 'prettier', 'json', 'import'],
      rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'node/no-extraneous-import': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
};
