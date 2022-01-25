const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
    entry: {
        server: resolve('../src/entry-server.js')
    },
    target: 'node',
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: resolve('../public/index.srr.html'),
            excludeChunks: ['server'], // 打包时，排除server.js，因为我们不需要把server.js转换的字符串插入到模板
            minify: {
                removeComments: false, // 打包时不删除注释
            }
        })
    ]
})
