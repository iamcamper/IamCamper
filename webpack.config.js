const path = require('path');

module.exports = {
  entry : './next_imc/pages/index.js',
  output : {
    filename : 'main.js',
    path : path.resolve(__dirname, './dist'),
  },
  mode : 'development',
  loaders:[  {
    test: /\.(gif|svg|jpg|png)$/,
    loader: "file-loader",
  }]
}

const withImages = require('next-images')

module.exports = withImages();
