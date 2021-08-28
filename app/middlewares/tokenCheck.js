const { verifyToken } = require("../utils/solveToken");

const tokenCheck = () => {
  return async (ctx, next) => {
    const url = ctx.originalUrl;
    if (url === "/" || url.indexOf("/drawbed") > -1) {
      // ctx.body = "Hello World";
      ctx.render("index");
    } else if (
      url.indexOf("doLogin") === -1 &&
      url.split("/")[1] === "api" &&
      url !== "/favicon.ico"
    ) {
      //验证token
      const { token } = ctx.header;
      if (token) {
        const result = verifyToken(token);
        if (result === "err") {
          ctx.utils.assert(false, ctx.utils.throwError(1001, "登录已过期"));
        } else {
          ctx.username = result.username;
          await next();
        }
      } else {
        ctx.utils.assert(false, ctx.utils.throwError(1002, "缺少token"));
      }
    } else {
      await next();
    }
  };
};
module.exports = tokenCheck;
