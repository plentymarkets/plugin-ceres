const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./resources/js/src/lightbox.min.js",
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./resources/js/src/lightbox.min.js", to: path.resolve(__dirname, "..", "..", "resources/js/dist/") }
            ]
        })
    ]
};
