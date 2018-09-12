/**
 * 日志输出--log4j配置文件
 */
var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;


module.exports = {
    "appenders": {
        "out": { "type": 'console' },
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "encoding": "utf-8",
            "maxLogSize": 2000000,
            "numBackups": 5,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "path": errorPath //自定义属性，错误日志的根目录
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "encoding": "utf-8",
            "maxLogSize": 2000000,
            "numBackups": 5,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "path": responsePath
        }
    },
    //供外部调用的名称和对应设置定义
    "categories": {
        "default": {"appenders": ['out'], "level": 'info'},
        "errorLogger": {"appenders": ['errorLogger'], "level": 'error'},
        "resLogger": {"appenders": ['resLogger'], "level": 'info'},
        "http": {"appenders": ["resLogger"],"level": "info"}
    },
    "baseLogPath": baseLogPath                  //logs根目录
}