/**
 * 用户类 controller
 */
const ApiErrorNames = require('../config/ApiErrorNames');
const APIError = require('../middlewares/result').APIError;
const userService = require('../service/userService.js')

/**
 * 查询所有用户
 */

let findAllUser = async (ctx, next) => {
    
    let result = await userService.findAllUser();
    ctx.body = result
};

let getUser = async (ctx, next) => {
    let userId = '8ecd2da0-b581-11e8-ab2d-6d36cdb19a3c'
    let result = await userService.findUserById(userId);
    if(!result[0]){
        throw new APIError(ApiErrorNames.USER_NOT_EXIST); 
    }
    ctx.rest({userInfo:result[0]})
};

/**
 * 用户登录
 */
let login = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.checkLogin(userData);
    ctx.rest({access_token:result})
};

/**
 * 注册用户
 */
let regist = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.addUser(userData);
    ctx.rest({userInfo:result[0]})
};


module.exports = {
    findAllUser,
    login,
    regist,
    getUser
};