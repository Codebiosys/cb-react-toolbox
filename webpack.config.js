/* eslint-disable */
/**
 * Baseline build specification
 *
 * Defines common configurations necessary for all builds of the application.
 *
 * To specify a new configuration, create a new webpack configuration file that
 * imports this module and overrride any desired settings.
 *
 * Note that this file is written in vanilla JS so that karma is able to run it.
 */

 'use strict';
 var path = require('path');
 var webpack = require('webpack');
 var pathAppRoot = path.resolve(__dirname, 'src');
 var config = {
     resolve: {
       extensions: ['.js', '.jsx'],
       modules: [pathAppRoot, 'node_modules']
     },

   module: {
    rules: [
       {
         test: /\.(test|spec)\.js$/,
         loader: 'ignore-loader'
       },
       {
         // Compile JSX files
         test: /(\.js|\.jsx)$/,
         exclude: /(node_modules)/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015', 'stage-0', 'react'],
           plugins: ['transform-class-properties'],
         },
       },
       {
           test: /\.[s]?css$/,
           use: [
             'style-loader',
             'css-loader',
             'resolve-url-loader',
             'sass-loader?sourceMap', // specify 'sourceMap' for resolve-url-loader
           ]
        },
        {
          // Load images as base64-encoded strings if they are small enough
          test: /(\.gif|\.jpe?g|\.png|\.svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
     ]
   },
   output: {
     library: 'CBReactToolbox',
     libraryTarget: 'umd'
   },
   plugins: [
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     })
   ]
 };

 if (process.env.NODE_ENV === 'production') {
   config.externals = {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: ['react'],
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: ['react-dom'],
          amd: 'react-dom',
        },
        'bootstrap': 'bootstrap',
        "lodash": 'lodash',
        "moment": 'moment',
      };
   config.plugins.push(
     new webpack.optimize.UglifyJsPlugin({
       compressor: {
         pure_getters: true,
         unsafe: true,
         unsafe_comps: true,
         warnings: false
       }
     })
   );
 }

 module.exports = config;
