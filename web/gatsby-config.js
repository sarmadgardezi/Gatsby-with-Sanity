// Must remain a CommonJS file (not ESM or TS)

/**
 * Register the TS evaluator once here so we don't need to do it in any other JS file.
 * It automatically reads the TS config from tsconfig.json and allows all other files
 * to be TS, including gatsby-[config|node|ssr|browser].
 */
require('ts-node').register()

// Use a TS version of gatsby-config.js
module.exports = require('./gatsby-config.ts')
