
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    entry: '/src/index.ts',
    output: {
        path: path.resolve(__dirname, "build"), // 打包出口
        filename: `js/[name]_[chunkhash:8].js`, // 打包完的静态资源文件名
    },
    mode: 'development', // 开发环境
    module: {
        // loader
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.tsx?$/, // 支持ts和tsx
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: ['\\.vue$'], // 编译.vue文件中的js
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                type: 'asset',
                generator: { filename: 'img/[contenthash:8][ext][query]'}
            }
        ]
    },
    
    devServer: {
        port: 8000,
        historyApiFallback: true, // 支持History模式
        static: {
            directory: path.join(__dirname, 'public'),
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    },

}