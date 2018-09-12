/**
 * 响应报文格式
 */

class Result {

    //构造方法 
    constructor(code,msg,data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

module.exports = Result;