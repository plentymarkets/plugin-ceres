const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    name: 'styles',
    entry: [
        './resources/scss/Ceres.scss',
        './resources/scss/Ceres_legacy.scss',
    ],
    module: {
        rules: [
            {
                test: /.\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ],
        noParse: [
            /\.svg$/,
            /\.png$/,
            /\.gif$/,
            /\/resources\/documents/
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            path: './resources/css'
        })
    ]
};