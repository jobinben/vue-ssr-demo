const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')

const vueServerRenderer = require('vue-server-renderer')

const app = new Koa()
const router = new Router()

const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const renderer = vueServerRenderer.createBundleRenderer(serverBundle, {
    template
})


router.get('(.*)', async ctx => {
    ctx.body = await renderer.renderToString()
})

app.use(serve(path.resolve(__dirname, 'dist')))  // 挂载静态目录
app.use(router.routes()) // 挂载路由

app.listen(8080, () => {
    console.log('server start port: 8080')
})