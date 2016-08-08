const webpack = require('webpack');
const path = require('path');
//const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
    //plugins: [commonsPlugin],

    entry: {

    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: path.join(__dirname, 'build')
    },

    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.js$/, loader: 'jsx-loader?harmony'},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {test: path.join(__dirname, 'src'), loaders: [ 'babel-loader']}
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
