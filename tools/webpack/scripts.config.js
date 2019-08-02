const path = require('path');

module.exports = {
    name: "scripts",
    entry: './resources/js/src/app/index.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [path.resolve(__dirname, "app"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};
