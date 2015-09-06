module.exports = {
  entry: {
    bundle: './app/app.module.js'
  },
  output: {
    filename: './app/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: "style!css!autoprefixer"
      }
      // ,
      // {
      //   test: /\.(png|jpg|gif)$/, 
      //   loader: "url?limit=8000"
      // }
    ]
  }
};
