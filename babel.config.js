module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@features': './src/features',
          '@shared': './src/shared',
          '@native': './src/native',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
