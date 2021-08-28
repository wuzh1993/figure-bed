const error = require("./error");
const response = require("./response");
const log = require("./log");
const tokenCheck = require("./tokenCheck");
const router = require("../router");
const cors = require("@koa/cors");

/**
 * token过期判断
 */
const mdTokenCheck = tokenCheck();

/**
 * 统一返回格式
 */
const mdResHandler = response();
/**
 * 错误处理
 */
const mdErrorHandler = error();
/**
 * 记录请求日志
 */
const mdLogger = log();

/**
 * 跨域
 */
const mdCors = cors({
  origin: "*",
  credentials: true,
  allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
});

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  // mdCors,
  mdResHandler,
  mdErrorHandler,
  mdTokenCheck,
  mdLogger,
  mdRoute,
  mdRouterAllowed,
];
