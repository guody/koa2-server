/**
 * 用户类 controller
 */
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const userService = require('../service/userService.js')

/**
 * 查询所有用户
 */

let findAllUser = async (ctx, next) => {
    console.log(ctx)
    let result = await userService.findAllUser();
    ctx.body = result
};

let getUser = async (ctx, next) => {
    let userId = '8ecd2da0-b581-11e8-ab2d-6d36cdb19a3c'
    let result = await userService.findUserById(userId);
    ctx.body = result
};

/**
 * 用户登陆
 */
let login = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.checkLogin(userData);
    ctx.body = result
};

/**
 * 注册用户
 */
let regist = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.addUser(userData);
    ctx.body = result
};


module.exports = {
    findAllUser,
    login,
    regist,
    getUser
};