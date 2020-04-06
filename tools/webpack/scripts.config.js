const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const WebpackRequireFrom = require("webpack-require-from");

module.exports = env =>
{
    env = env || {};
    return {
        name: "scripts",
        mode: env.prod ? "production" : "development",
        entry: {
            base: "./resources/js/src/base.js",
            checkout: "./resources/js/src/checkout.js"
        },
        output: {
            filename: "ceres-[name]" + (env.prod ? ".min" : "") + ".js",
            chunkFilename: "chunks/ceres-[name]"+ (env.prod ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "..", "..", "resources/js/dist/")
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
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        cache: true,
                        fix: env.prod
                    }
                },
                {
                    test: require.resolve("jquery"),
                    use: [
                        {
                            loader: "expose-loader",
                            options: "$"
                        },
                        {
                            loader: "expose-loader",
                            options: "jQuery"
                        }
                    ]
                },
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
            new WebpackRequireFrom({
                replaceSrcMethodName: "__loadPluginChunk"
            })
        ]
    };
};
