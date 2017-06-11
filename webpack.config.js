
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname+'/editor/static',
        filename: 'signpost.js',
      library: 'myLibrary',
      libraryTarget: 'var'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
