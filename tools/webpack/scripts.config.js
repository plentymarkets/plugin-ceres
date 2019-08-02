const path = require('path');

module.exports = (env) => {
    return {
        name: 'scripts',
        mode: env.prod ? 'production' : 'development',
        entry: './resources/js/src/app/index.js',
        output: {
            filename: '../../../resources/js/dist/wp-ceres' + (env.prod ? '.min' : '') + '.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            modules: [path.resolve(__dirname, "app"), "node_modules"]
        },
        devtool: 'source-map',
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
                }
            ]
        }
    }
};
