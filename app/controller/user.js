const solveToken = require("../utils/solveToken");
const userModel = require("../modules/user");

class User {
  async loginIn(ctx) {
    const { password, username } = ctx.request.body;
    if (
      !username ||
      !password ||
      password === "d41d8cd98f00b204e9800998ecf8427e"
    ) {
      ctx.utils.assert(false, ctx.utils.throwError(-1, "账号或者密码不能为空"));
    } else {
      const findRes = await userModel.find({ username });
      if (findRes.length === 0) {
        const newUser = new userModel({
          username,
          password,
        });
        await newUser.save();
        const token = solveToken.generateToken({ username });
        ctx.body = {
          token: token,
          result: true,
          message: "登录成功",
        };
      } else {
        if (findRes[0].password !== password) {
          ctx.utils.assert(false, ctx.utils.throwError(-1, "密码错误"));
        } else {
          const token = solveToken.generateToken({ username });
          ctx.body = {
            token: token,
            result: true,
            message: "登录成功",
          };
        }
      }
    }
  }
}

module.exports = new User();
