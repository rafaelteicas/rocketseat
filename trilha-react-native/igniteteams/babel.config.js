module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    ["module-resolver", {
      root: ".",
      alias: {
        '@assets': './src/assets',
        '@components': './src/components',
        '@routes': './src/routes',
        '@screens': './src/screens',
        '@storage': './src/storage',
        '@utils': './src/utils'
      }
    }]
  ]
  };
};
