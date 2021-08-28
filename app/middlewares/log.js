const log4js = require("log4js");
const { outDir, flag, level } = require("../config").logConfig;
log4js.configure({
  appenders: { cheese: { type: "file", filename: `${outDir}/receive.log` } },
  categories: { default: { appenders: ["cheese"], level: "info" } },
  pm2: true,
});

const logger = log4js.getLogger();
logger.level = level;

module.exports = () => {
  return async (ctx, next) => {
    const { method, path, origin, query, body, headers, ip, url } = ctx.request;
    const data = {
      method,
      path,
      origin,
      query,
      body,
      ip,
      headers,
    };
    await next();
    if (flag) {
      const { status, params } = ctx;
      data.status = status;
      data.params = params;
      data.result = ctx.body || "no content";
      if (url.split("/")[1] !== "api") {
        return;
      }
      if (ctx.body.code !== 0) {
        logger.error(JSON.stringify(data));
      } else {
        logger.info(JSON.stringify(data));
      }
    }
  };
};
