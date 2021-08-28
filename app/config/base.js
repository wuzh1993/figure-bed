const pwd = process.cwd();
module.exports = {
  dbURL: "mongodb://127.0.0.1:27017/drawBed",//数据库地址,
  port: "3001",//服务启动端口
  host: "http://127.0.0.1",
  tempFilePath: `${pwd}/app/public/temp`, //  临时文件存放地址,
  logConfig: {
    flag: true,
    outDir: `${pwd}/app/public/log`,
    level: "info",
  },//日志文件配置
};
