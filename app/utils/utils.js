const assert = require("assert").strict;
module.exports = {
  throwError(code = 400, msg = "服务器异常") {
    const error = new Error(msg);
    error.code = code;
    throw error;
  },
  assert,
};
