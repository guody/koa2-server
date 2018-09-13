/**
 * user 业务处理层
 */
const md5 = require('md5')
const userDao = require('../model/userDao.js')
const authUtil = require('../utils/authUtil.js');
const uuidv1 = require('uuid/v1');
const Base64 = require('js-base64').Base64;
const ApiErrorNames = require('../config/ApiErrorNames');
const APIError = require('../middlewares/result').APIError;

/**
 * 查询所有用户
 */
let findAllUser = async () => {
    let user = await userDao.findAllUser();
    //把results对象转为字符串，去掉RowDataPacket
    user = JSON.stringify(user);
    //把results字符串转为json对象  格式---[{}]
    user = JSON.parse(user);
    return user;  
}

/**
 * 根据用户id查询
 */
let findUserById = async (userId) => {
    let user = await userDao.findUserById(userId);
    //把results对象转为字符串，去掉RowDataPacket
    user = JSON.stringify(user);
    //把results字符串转为json对象  格式---[{}]
    user = JSON.parse(user);
    return user; 
}

/**
 * 用户登录
 */
let checkLogin = async (value) => {
    let username = value.username || '';
    let password = value.password || '';
    // 检查用户名
    let user = await userDao.findUserByName(username);
    //把results对象转为字符串，去掉RowDataPacket
    user = JSON.stringify(user);
    //把results字符串转为json对象  格式---[{}]
    user = JSON.parse(user);

    if (Array.isArray(user) && user.length == 0) {
        throw new APIError(ApiErrorNames.USER_NOT_EXIST); 
    }
    // 检查密码
    password = Base64.encode(md5(password));   
    if(password !== user[0].password){
        throw new APIError(ApiErrorNames.PASSWORD_ERROR); 
    }

    let userId = user[0].userid;
    // 登陆成功，生成一个登录token
    let access_token = authUtil.genToken(userId);

    return access_token;

}

/**
 * 注册用户
 * @param {*} value 
 */
let addUser = async (value)=> {
    let username = value.username || '';
    let password = value.password || '';

    //密码Md5加密 base64编码
    password = Base64.encode(md5(password));

    // 检查用户名是否为空
    if(!username){
        throw new APIError(ApiErrorNames.USERNAME_EMPTY); 
    }
    //检查密码是否为空
    if(!password){
        throw new APIError(ApiErrorNames.PASSWORD_EMPTY);  
    }
    // 用户名唯一性检查  user为数组
    let user = await userDao.findUserByName(username);
    if (Array.isArray(user) && user.length > 0) {
        throw new APIError(ApiErrorNames.USERNAME_EXIST); 
    }

    // 生成用户ID
    let userid = uuidv1();
    let param = [userid,username,password]
    await userDao.addUserData(param);
    let addUser = await userDao.findUserByName(username);
    return addUser; 
}

module.exports = {
    checkLogin,
    addUser,
    findAllUser,
    findUserById
};