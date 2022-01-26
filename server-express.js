const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const vueServerRenderer = require('vue-server-renderer')


const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const renderer = vueServerRenderer.createBundleRenderer(serverBundle, {
    template
})



app.get('*', (req, res) => {
    renderer.renderToString((err, html) => {
        if(err) {
            res.status(500).end('server error: 500')
            return
        }
        res.end(html)
    })
})

app.use(express.static(__dirname + 'dist')) // 挂载静态资源目录

app.listen(8080, () => {
    console.log('server start...')
})