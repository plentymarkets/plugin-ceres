const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = env =>
{
    env = env || {};
    return {
        name: "client",
        mode: env.prod ? "production" : "development",
        entry: "./resources/js/src/entry-client.js",
        output: {
            filename: "ceres-client" + (env.prod ? ".min" : "") + ".js",
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
