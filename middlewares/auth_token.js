const authUtil = require('../utils/authUtil');
const ApiErrorNames = require('../config/ApiErrorNames');
const APIError = require('./result').APIError;

/**
 * access_token验证中间件
 */
let authToken = async (ctx,next) => {
    await next();
    if(ctx.method == 'OPTIONS'){
        return;
    }
    
    // 用户登录时，不用验证
    if(ctx.url == '/api/user/login' || ctx.url == '/api/user/regist'){
        return
    }
    let token; 
    token = ctx.headers.token;   
    if (!token) {
        throw new APIError(ApiErrorNames.TOKEN_NOT_FOUND);
        return;
    } 

    authUtil.verifyToken(token);
}

module.exports = authToken;