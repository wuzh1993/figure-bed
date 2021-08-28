/*封装异常捕捉*/
const error = () => {
  return async (ctx, next) => {
    if (ctx.request.url.split("/")[1] === "api") {
      try {
        await next();
        if (ctx.status === 200) {
          ctx.res.success();
        }
      } catch (err) {
        if (err.code) {
          ctx.res.fail({ code: err.code, msg: err.message });
        } else {
          ctx.app.emit("error", err, ctx);
        }
      }
    } else {
      await next();
    }
  };
};
module.exports = error;
