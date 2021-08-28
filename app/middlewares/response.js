/*统一返回格式*/
const response = () => {
  return async (ctx, next) => {
    ctx.res.fail = ({ code, data, msg }) => {
      ctx.body = {
        code,
        data,
        msg,
      };
    };
    ctx.res.success = () => {
      ctx.body = {
        code: 0,
        data: ctx.body,
        msg: "success",
      };
    };
    await next();
  };
};
module.exports = response;
