const Vue = require('vue')
const express = require('express')
const vueServerRender = require('vue-server-renderer')
const fs = require('fs')

// 1. 创建本地服务器
const server = express()

// 2. 读取VUE SSR的模板
const template = fs.readFileSync('./index.template.html', 'utf-8')

// 3. 把模板引入到renderer
const renderer = vueServerRender.createRenderer({
    template
})

// 4. 定义一个上下文
const context = {
    title: 'Vue-SSR',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue-ssr-demo">
    `
}

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        // 这里的内容都会插入到<!--vue-ssr-outlet-->注释的下面
        template: `<div>Hi Vue SSR! current url: {{url}}</div>`
    })
    // 传入vue实例，上下文context
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('服务器错误: 500')
            return
        }
        res.end(html)
    })
})

server.listen(8080, () =>{
    console.log('服务器已开启: 127.0.0.1:8080')
})

