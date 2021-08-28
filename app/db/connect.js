const mongoose = require("mongoose");
const config = require("../config");
const chalk = require("chalk");
mongoose.Promise = global.Promise;

const db = mongoose.connection;

mongoose.set("useCreateIndex", true);

mongoose.connect(config.dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log(chalk.green("连接数据库成功"));
});

db.on("error", function (error) {
  console.error(chalk.red("数据库连接错误: " + error));
  mongoose.disconnect();
});

db.on("close", function () {
  console.log(chalk.red("数据库断开，重新连接数据库"));
  mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = mongoose;
