const Koa = require('koa') // 导入koa2
const bodyParser = require('koa-bodyparser') // 解析request的body
const logger = require('koa-logger') // 日志
const Config = require('../config')
const routers = require('./routes/index')

const app = new Koa() // 创建一个Koa对象表示webapp本身

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置控制台日志中间件
app.use(logger())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(Config.port)
console.log('app started at port ' + Config.port + ' ....')
