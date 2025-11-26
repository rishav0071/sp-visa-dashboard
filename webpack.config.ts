const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],
  resolve: { fallback: { process: require.resolve('process') } },
};
