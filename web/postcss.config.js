// Must remain a CommonJS file (not ESM or TS)

// See: https://tailwindcss.com/docs/using-with-preprocessors#using-postcss-as-your-preprocessor
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./src/styles/tailwind.config.js'),
    require('postcss-preset-env')({ stage: 1 }), // https://preset-env.cssdb.org/features#stage-1
  ],
}
