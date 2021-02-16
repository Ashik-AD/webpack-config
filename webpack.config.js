const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: ['babel-polyfill', './src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contentHash].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
                type: 'javascript/auto'
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        sources: true
                    }
                }
            
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[contentHash].[ext]',
                            outputPath: 'assets',
                            publicPath: 'assets',
                            esModule: false
                        }
                    }
                ]

            }
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 3500
    },
    devtool: 'source-map',
    target: 'web'
}