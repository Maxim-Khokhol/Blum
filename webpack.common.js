const path = require('path');

module.exports = {
  entry: {
    app: './js/starfield.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/starfield.js',
  },
};