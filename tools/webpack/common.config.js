const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (mode) => {
    return {
        mode: mode,
        output: {
            filename: "ceres-[name]" + (mode === 'production' ? ".min" : "") + ".js",
            chunkFilename: "chunks/ceres-[name]"+ (mode === 'production' ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "../../resources/js/dist/"),
        },
        resolve: {
            alias: {
                vue: "vue/dist/vue" + (mode === 'production' ? ".min" : "") + ".js"
            }
        },
        devtool: "source-map",
        cache: {
            type: "filesystem"
        },
        module: {
            rules: [
                {
                    test: require.resolve("jquery"),
                    loader: "expose-loader",
                    options: {
                        exposes: ["$", "jQuery"]
                    }
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    include: "/resources/js/src/",
                    loader: "babel-loader",
                    options: {
                        cacheCompression: false,
                        cacheDirectory: true,
                    }
                }
            ]
        },
        optimization: {
            chunkIds: "natural",
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    parallel: true
                }),
            ],
        },
        plugins: [
            new VueLoaderPlugin({
                exposeFilename: true
            })
        ]
    };
}
