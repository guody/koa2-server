/**
 * 路由入口
 */
const router = require('koa-router')({prefix: '/api'})  //添加前缀 '/api'

const home = require('./home')  // 首页
const user = require('./user')  //用户类


router.use('/', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router;

