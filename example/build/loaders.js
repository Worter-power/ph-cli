'use strict'

const isDev = process.env.NODE_ENV === 'development';
const jsexclude = /node_modules/;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('./postcss.config');
const path = require('path');
module.exports = [
    {
        test: /\.jsx?$/,
        exclude: jsexclude,
        use: [
            // 'cache-loader',
            "eslint-loader",
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [ '@babel/preset-env', {
                            "corejs": 3,
                            "modules": false,
                            "targets": {
                                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                            }
                        }]
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime', 
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        "@babel/plugin-proposal-json-strings",
                        "transform-vue-jsx",
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ["@babel/plugin-proposal-decorators", { "legacy": true }]
                    ]
                }
            }
        ]
    },
    {
        test: /\.ts$/,
        exclude: jsexclude,
        enforce: 'pre',
        use: [
            "tslint-loader"
        ]
    },
    {
        test: /\.tsx?$/,
        exclude: jsexclude,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    },
    {
        test: /\.css$/,
        exclude: jsexclude,
        use: [
            // 'cache-loader',
            'vue-style-loader',
            { loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader},
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: postcss.plugins,
                    sourceMap: isDev ? false : true,
                }
            }
        ]
    },
    {
        test: /\.less$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            },
            'postcss-loader',
            'less-loader'
        ],
        exclude: jsexclude,
    },
    {
        test: /\.scss$/,
        exclude: jsexclude,
        use: [
            // 'cache-loader',
            { loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "sass-loader", options: { sourceMap: isDev ? true : false } },
            {
                loader: "postcss-loader",
                options: {
                    plugins: postcss.plugins,
                    parser: 'postcss-scss',
                    sourceMap: isDev ? true : false,
                }
            },
            // sass 全局变量和函数
            {
                loader: 'sass-resources-loader',
                options: {
                    sourceMap: isDev ? true : false,
                    resources: [
                        path.resolve(__dirname, '../public/scss/var.scss'),
                        path.resolve(__dirname, '../public/scss/mixin.scss'),
                    ]
                }
            }
        ]
    },
    {
        test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
        use: 'json-loader', //具体loader的名称
        type: 'javascript/auto',
        exclude: jsexclude
    },
    {
        test: /\.vue$/,
        use: [
            // 'cache-loader',
            {
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        whitespace: 'condense'
                    }
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|gif|jepg|svg|webp)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192, // 小于8192字节的图片打包成base 64图片
                    outputPath: 'images/', //定义输出的图片文件夹
                    publicPath: '',
                    name: '[name].[ext]' //打包后输出路径
                }
            }
        ]
    },
    {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'fonts/[name].[ext]?[hash:8]',
                publicPath: '',
            },
        }],
    },
    {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'audios/[name].[ext]?[hash:8]',
                publicPath: ''
            },
        }],
    },
    {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                limit: 8192,
                name: 'videos/[name].[ext]?[hash:8]',
                publicPath: ''
            },
        }]
    }
]