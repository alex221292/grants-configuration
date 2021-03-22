const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  source: __dirname + '/src/main/jsx',
  dist: __dirname + '/src/main/resources/static',
  directDist: __dirname + '/target/libs/exploded',
  include: [
    path.resolve(__dirname, 'src/main/jsx'),
  ]
};

const base = {
  entry: [PATHS.source + '/index.jsx'],
  output: {
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.include,
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        }
      },

      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: PATHS.include,
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              localIdentName: 'grants-configurator_[name]__[local]___[hash:base64:5]'
            }
          }
        })
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: 'grants-configurator_[name]__[local]___[hash:base64:5]'
                }
              }
            },
            {
              loader: 'less-loader',
              options: {
                paths: [path.resolve(__dirname, '.'), path.resolve(__dirname, './node_modules')]
              }
            }
          ]
        })
      },

      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192
          }
        }
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          }
        }
      }
    ]
  },

  resolve: {
    symlinks: false,
    modules: [PATHS.source, 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.less'],
    mainFields: ['browser', 'main', 'module'],
  }
};

const production = {
  output: {
    path: PATHS.dist
  }
};

module.exports = function (env) {
  switch (env) {
    case 'production':
    default:
      return merge([
        base,
        production
      ]);
  }
}
