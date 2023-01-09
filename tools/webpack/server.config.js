const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CommonConfig = require("./common.config");

module.exports = (mode) =>
{
    return merge(
        CommonConfig(mode),
        {
            name: "server",
            target: "node",
            output: {
                filename: "ceres-server" + (mode === "production" ? ".min" : "") + ".js",
                libraryTarget: "commonjs2"
            },
            plugins: [
                new webpack.optimize.LimitChunkCountPlugin({
                    maxChunks: 1
                })
            ]
        }
    );
};
