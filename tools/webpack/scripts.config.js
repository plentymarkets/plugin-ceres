const path = require("path");

module.exports = env =>
{
    env = env || {};
    return {
        name: "scripts",
        mode: env.prod ? "production" : "development",
        entry: {
            app: "./resources/js/src/index.js",
            category: "./resources/js/src/category.js",
            item: "./resources/js/src/item.js",
            checkout: "./resources/js/src/checkout.js"
        },
        output: {
            filename: "../../../resources/js/dist/ceres-[name]" + (env.prod ? ".min" : "") + ".js",
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
        }
    };
};
