const postcssPresetEnv = require('postcss-preset-env');
const postcssGlobalData = require('@csstools/postcss-global-data');

module.exports = {
  plugins: [
    postcssGlobalData({
      files: [
        './src/assets/styles/global.css'
      ]
    }),
    postcssPresetEnv()
  ],
}
