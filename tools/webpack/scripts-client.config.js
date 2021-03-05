const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = env =>
{
    env = env || {};
    return {
        name: "client",
        mode: env.prod ? "production" : "development",
        entry: {
            client: "./resources/js/src/entry-client.js"
        },
        output: {
            filename: "ceres-[name]" + (env.prod ? ".min" : "") + ".js",
            chunkFilename: "chunks/ceres-client-[name]"+ (env.prod ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "..", "..", "resources/js/dist/"),
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
            })
        ]
    };
};
