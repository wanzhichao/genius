var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    devtool: false,
    debug: true,
    entry: {
        app: path.resolve(APP_PATH + '/main', 'main.js'),
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'classnames'
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: "js/[name].js"
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 3005,
        host: "10.13.24.56"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: APP_PATH,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.(png|jpg)$/i,
                loader: "file-loader?name=css/img/[name].[ext]" },
            /*{
             test: /\.css?$/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
             }*/

            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*||)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=css/fonts/[name].[ext]'
            },
            {
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
            }
            /*{
                test: /\.css$/,
                loader: 'file-loader?name=css/[name].[ext]'
            },*/
        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            title: "Hello world app",
            template: "html/index.ejs",
            filename: "html/index.html"
        }),
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.js"
        })
    ]
}