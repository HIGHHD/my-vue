const resolve = require('path').resolve;
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (options = {}) => {
  return {
    devtool: options.dev ? 'eval-source-map' : false,
    mode: options.dev ? 'development' : 'production',
    performance: {
      maxEntrypointSize: 5000000,
      maxAssetSize: 2000000,
    },
    entry: {
      index: './src/index.js'
    },
    output: {
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'images/[contenthash][ext][query]',
      chunkFilename: (pathData) => {
        // console.log('pathdata-------', pathData);
        return 'chunk/[name]/[chunkhash].js';
      },  
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: 'single',
    },
    module: {
      rules: [{
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            !options.dev ? MiniCssExtractPlugin.loader :
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
          type: 'asset/resource'
        },
        {
          test: /\.svg/,
          type: 'asset/inline'
        },
        {
          test: /\.(html)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[contenthash][ext][query]'
          }
        },
        {
          test: /\.(json|md)$/,
          type: 'asset/source',
          generator: {
            filename: 'source/[contenthash][ext][query]'
          }
        }
      ]
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
        'vue': 'vue/dist/vue.esm.js'
      },
      extensions: ['.js', '.vue', '.json', '.css']
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/template/index.ejs',
        inject: false
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css'
      })
    ]
  }
};