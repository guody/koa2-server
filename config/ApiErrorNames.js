/**
 * API错误名称
 */
var ApiErrorNames = {
    UNKNOW_ERROR: {code:'9999', message: '未知错误'},
    TOKEN_NOT_FOUND: {code:'0001', message: 'token信息为空'},
    INVALID_TOKEN: {code: '0002', message: 'token失效'},
    USER_NOT_EXIST: {code: '1001', message: '用户不存在'},
    PASSWORD_ERROR: {code: '1002', message: '密码错误'},
    USERNAME_EMPTY: {code: '1003', message: '用户名为空'},
    PASSWORD_EMPTY: {code: '1004', message: '密码为空'},
    USERNAME_EXIST: {code: '1005', message: '用户名已存在'}
};

module.exports = ApiErrorNames;

