module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
