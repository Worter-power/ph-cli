'use strict'

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

module.exports = {
    mode: 'production',
    externals: config.externals,
    entry: {
        'app': './src/main.ts',
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[contenthash].min.js',
        chunkFilename: 'js/[name].[contenthash].chunk.js',
        publicPath: config.production.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
        alias: config.alias,
        modules: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules")
        ] // 绝对路径
    },
    performance: {
        hints: "warning", // false 不展示警告或错误提示。 | "error" 将展示一条警告，通知你这是体积大的资源。在开发环境，我们推荐这样。| "warning"
        maxEntrypointSize: 500 * 1024,
        maxAssetSize: 1 * 1024 * 1024
    },
    stats: { // 统计信息(stats)
        children: false,
        warnings: true,
        providedExports: true,
        modules: false // 添加构建模块信息
    },
    cache: true,
    module: {
        rules: config.loaders
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PLATFORM: JSON.stringify(process.env.PLATFORM)
            },
            isDev: process.env.NODE_ENV === 'development'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            // favicon: './public/favicon.ico',
            inject: 'body', // js 挂在地方
            chunks: ['manifest', 'vendor', 'app'],
            hash: true,
            minify: {
                removeComments: true,// 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true, // 移除属性的引号
                removeRedundantAttributes: true, // 删除多余的属性
                collapseBooleanAttributes: true, // 省略只有 boolean 值的属性值 例如：readonly checked
                minifyCSS: true// 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({ 
            filename: 'css/[name].[contenthash].min.css',
            chunkFilename: 'css/[id].[contenthash].min.css',
        }),
        new VueLoaderPlugin(),
        // 复制插件
        new CopyWebpackPlugin([
            { 
                from: path.join(__dirname, '../version.json'), 
                to: path.join(__dirname, '../dist/') 
            }
        ])
        // 输出资源清单
        // new ManifestPlugin(),
        // new AssetsPlugin(),
        // 打包生成报告单
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     //  是否在默认浏览器中自动打开报告
        //     openAnalyzer: false,
        //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
        //     analyzerPort: 9528, 
        //     reportFilename: 'static/report.html',
        // })
    ],
    optimization: {
        namedChunks: true,
        minimizer: [ // 用于配置 minimizers 和选项
            // webpack 不支持es6语法的压缩，这里要使用需要babel配合
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: false, // set to true if you want JS source maps
            //     uglifyOptions: {
            //         warnings: false,
            //         compress: {
            //             drop_debugger: true,
            //             drop_console: true
            //         }
            //     }
            // }),
            new TerserPlugin({
                cache: true, // 开启缓存
                parallel: true, // 支持多进程
                sourceMap: true, 
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }

                },
                parallel: true,
                extractComments: false
            }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         drop_debugger: true,
            //         drop_console: true
            //     }
            // }),
            // 压缩 js
            new OptimizeCSSAssetsPlugin({}) // 压缩 css
        ]
    }
}