const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CommonConfig = require('./common.config');

module.exports = (mode) => {
    return merge(
        CommonConfig(mode),
        {
            module: {
                rules: [
                    {
                        test: /.\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    url: false,
                                    sourceMap: mode !== 'production'
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: mode !== 'production',
                                    plugins: [
                                        require("autoprefixer")()
                                    ]
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: mode !== 'production'
                                }
                            }
                        ]
                    }
                ]
            },
            plugins: [
                new FixStyleOnlyEntriesPlugin(),
                new MiniCssExtractPlugin({
                    filename: "../../css/ceres-[name]" + (mode === 'production' ? ".min" : "") + ".css",
                })
            ],
        }
    );
}
