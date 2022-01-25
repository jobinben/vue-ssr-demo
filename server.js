const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>Hi Vue SSR! current url: {{url}}</div>`
    })

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('服务器错误: 500')
            return
        }
        res.end(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>vue ssr</title>
            </head>
            <body>
             ${html}
            </body>
            </html>`
        )
    })
})

server.listen(8080, () =>{
    console.log('服务器已开启: 127.0.0.1:8080')
})

