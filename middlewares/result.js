/**
 * 返回结果处理
 */

 module.exports = {
    APIError: function (errObj) {
        this.errObj = errObj;
        // this.code = code || 'INTERNAL:UNKNOW_ERROR';
        // this.message = message || '未知错误';
    },    
    restify: (pathPrefix) =>{
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            // 是否为api前缀
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定rest()方法:
                ctx.rest = (data) => {
                    ctx.response.body = {
                        code:'0000',
                        message:'请求成功',
                        data:data
                    }
                }

                //错误处理
                try {
                    await next();
                } catch (e) {
                    // 返回错误:
                    // ctx.response.status = 400;
                    ctx.response.body = {
                        code: e.errObj.code || 'INTERNAL:UNKNOW_ERROR',
                        message: e.errObj.message || '未知错误'
                    };
                }                
            } else {
                await next();
            }            
        }

    }


 }