/**
 * 用户信息 数据库操作
 */
const { operateDB } = require('../utils/mysql')

//查询所有用户
let findAllUser = async () => {
    let _sql =  `select * from users`
    let users = await operateDB(_sql);
    return users;
};

// 根据用户名查询
let findUserByName = async (username) => {
    let _sql =  `select * from users where username="${username}"`
    let user = await operateDB(_sql);
    return user;
};

// 根据userid查询
let findUserById = async (userid) => {
    let _sql =  `select * from users where userid="${userid}"`
    let user = await operateDB(_sql);
    return user;
};

// 保存用户
let addUserData = async (value) => {
    let _sql =  `insert into users(userid,username,password) values(?,?,?)`
    let result = await operateDB(_sql,value);
    return result;
};

//更新token
let updateUserToken = async (value) => {
    let _sql =  `update users set access_token=? where userid=?`
    let result = await operateDB(_sql,value);
    return result;   
}

module.exports = {
    findUserByName,
    addUserData,
    updateUserToken,
    findAllUser,
    findUserById
};


