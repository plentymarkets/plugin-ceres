const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
    env = env || {};
    return {
        name: 'styles',
        mode: env.prod ? 'production' : 'development',
        entry: {
            'Ceres': './resources/scss/Ceres.scss',
            'Ceres_legacy': './resources/scss/Ceres_legacy.scss',
        },
        module: {
            rules: [
                {
                    test: /.\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: !env.prod
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !env.prod,
                                outputStyle: env.prod ? 'compressed' : 'nested'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '../../css/[name]' + (env.prod ? '.min' : '') + '.css',
            })
        ],
        output: {
            path: path.resolve(__dirname, '../../resources/js/dist')
        }
    };
};