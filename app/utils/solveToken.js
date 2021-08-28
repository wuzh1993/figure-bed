const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
module.exports = {
  generateToken(data) {
    //生成token
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(path.resolve(__dirname, "../pem/private.key")); //私钥 可以自己生成
    const token = jwt.sign(
      {
        data, // 自定义字段
        // exp: created + 3000 * 60, // 过期时间 30 分钟
        exp: created + 60 * 60 * 6, // 过期时间 30 分钟
        iat: created, // 创建时间
      },
      cert,
      { algorithm: "RS256" }
    );
    return token;
  },
  verifyToken(data) {
    //解析token
    let cert = fs.readFileSync(path.resolve(__dirname, "../pem/private.key"));
    let res;
    try {
      let result = jwt.verify(data, cert, { algorithms: ["RS256"] });
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      } else {
        res = "err";
      }
    } catch (e) {
      res = "err";
    }
    return res;
  },
};
