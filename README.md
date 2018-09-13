## KOA2——Server
**技术栈：koa2 + mysql + ES6 + log4js**  
此项目运用MVC模式  

**以登录、注册功能，来示例（接口请求使用token验证）：**  
登录成功后，生成一个token，返回给前端存储在本地；后续前端每次请求接口时将token附在header中，带给后端，后端来判断token是否失效，  
若有效，继续请求；若失效，需重新登录。具体用法参看[jwt使用](https://www.npmjs.com/package/jwt)

运行前，需要配置config.js中数据库   
mysql操作可运用ORM（对象关系映射）框架Sequelize，详细使用可参考，[这篇文章](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471955049232be7492e76f514d45a2180e2c224eb7a6000)

**目录说明:**   
bin----启动入口（通过www文件引入app.js)  
config----配置文件（数据库、服务端口配置，log4js日志输出配置)   
entity----实体类  
controller----控制层  
model----数据模型  
service----业务层  
error----API请求错误处理  
logs----日志输出文件目录  
middlewares----自定义中间件（日志、格式化响应)  
routers----路由（index.js为路由入口)  
utils----工具类（数据库连接池、日志)  
views----视图层  

*****






