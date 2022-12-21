module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      },
    },
  },
  globals: {
    window: true,
    __DEV__: true,
  },
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    camelcase: ['error'],
    'no-useless-constructor': 'off',
    'no-underscore-dangle': [2, {allow: ['__typename']}],
    'no-use-before-define': [0],
    'import/prefer-default-export': [0],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-key': ['error', {checkFragmentShorthand: true}],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    'react-native/no-unused-styles': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['*.svg'],
      rules: {
        camelcase: 'off',
      },
    },
  ],
};
