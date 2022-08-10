const path = require("path");
const WebpackRequireFrom = require("webpack-require-from");
const ESLintPlugin = require("eslint-webpack-plugin");
const { merge } = require('webpack-merge');
const CommonConfig = require('./common.config');

module.exports = (mode) => {
    return merge(
        CommonConfig(mode),
        {
            plugins: [
                new ESLintPlugin({
                    extensions: ['js'],
                    // extensions: ['js', 'vue'],
                    context: path.resolve(__dirname, "../../resources/js/src/"),
                    exclude: '/node_modules/*',
                    fix: true,
                    cache: true
                }),
                new WebpackRequireFrom({
                    replaceSrcMethodName: "__loadPluginChunk"
                })
            ]
        }
    );
}
