const authUtil = require('../utils/authUtil');
const Result = require('../entity/Result');

/**
 * access_token验证中间件
 */
let authToken = async (ctx,next) => {
    await next();
    if(ctx.method == 'OPTIONS'){
        return;
    }
    
    // 用户登录时，不用验证
    if(ctx.url == '/api/user/login'){
        return
    }
    let token; 
    token = ctx.headers.token;   
    if (!token) {
        let res = new Result('403','token为空，请重新登录'); 
        ctx.body = res;
        console.log(111)
        return;
    } 
    
 
}

module.exports = authToken;