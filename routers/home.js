const router = require('koa-router')()

router.get('/',async (ctx,next)=>{
    ctx.body = 'hello koa2'
})

module.exports = router;