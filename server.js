const koa = require('koa')
const app = new koa();
const serve = require('koa-static')
const path = require('path')
const router = require('koa-router')()
// hit /, serve folder

// serve build folder
app.use(serve(path.join(__dirname, './dist')))

app.listen(process.env.PORT || 3000)