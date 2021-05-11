const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports = env =>
{
    env = env || {};
    return {
        name: "server",
        mode: env.prod ? "production" : "development",
        entry: "./resources/js/src/entry-server.js",
        target: "node",
        output: {
            filename: "ceres-server" + (env.prod ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "..", "..", "resources/js/dist/"),
            libraryTarget: "commonjs2"
        },
        resolve: {
            alias: {
                vue: "vue/dist/vue" + (env.prod ? ".min" : "") + ".js"
            }
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin({
                exposeFilename: true
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ]
    };
};
