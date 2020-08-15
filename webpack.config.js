var path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        publicPath: '/dist/',
        contentBase: "./client",
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?/, exclude: /(node_modules)/, use: {
                    loader: 'babel-loader', options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};

 