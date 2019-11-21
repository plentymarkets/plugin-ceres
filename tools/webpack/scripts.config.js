const path = require("path");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = env =>
{
    env = env || {};
    return {
        name: "scripts",
        mode: env.prod ? "production" : "development",
        entry: "./resources/js/src/app/index.js",
        output: {
            filename: "../../../resources/js/dist/ceres" + (env.prod ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "dist")
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
                        cache: true
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
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: [
            new MomentLocalesPlugin({
                localesToKeep: ["de", "en", "fr", "it", "es", "tr", "nl", "pl", "se", "ru", "sk", "pt", "bg", "ro"]
            })
        ]
    };
};
