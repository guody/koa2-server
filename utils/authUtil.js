const fs = require('fs')
const jwt = require('jsonwebtoken')
const ApiErrorNames = require('../config/ApiErrorNames');
const APIError = require('../middlewares/result').APIError;
/**
 * 生成UUID
 */
let genUUID = () => {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * 使用RS256算法，生成access_token
 */

let genToken = (userId)=> {
   
    // 获取签发 JWT 时需要用的密钥
    const privateKey = fs.readFileSync('./config/cert/private.key')
    // Token 数据
    let payload = {
        iss: 'guody',
        sub: userId
    }

    let opts = {
        algorithm: 'RS256',
        expiresIn: '1h'
    }

    // 签发 Token
    const tokenRS256 = jwt.sign(payload, privateKey,opts)
    return tokenRS256;
}

/**
 * 验证登录token
 * payload返回null时表示不合法或者过期
 */
let verifyToken = (token)=> {
    let payload = null;
    // 获取验证 JWT 时需要用的公钥
    const publicKey = fs.readFileSync('./config/cert/public.key')
    // 验证 Token
    try {
        //验证token是否有效
        payload = jwt.verify(token,publicKey,{algorithms:'RS256'});
        console.log(payload)
    } catch (err) {
        console.log(err);
        throw new APIError(ApiErrorNames.INVALID_TOKEN);
        return;
    }
    return payload;  
}



module.exports = {
    genToken,
    verifyToken
};