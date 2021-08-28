const path = require("path");
const Koa = require("koa");
const compose = require("koa-compose");
const bodyParser = require("koa-bodyparser");
const config = require("./config");
const chalk = require("chalk");

const MD = require("./middlewares/");
const utils = require("./utils/utils");
const app = new Koa();

const cors = require("@koa/cors");
const static = require("koa-static");
const render = require("koa-art-template");

render(app, {
  root: path.join(__dirname, "front"),
  extname: ".html", // 后缀名
  debug: process.env.NODE_ENV !== "production",
});

app.context.utils = utils;

app.use(
  cors({
    origin: function (ctx) {
      return "*";
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 5,
  })
);

app.use(static(path.join(__dirname, "./static")));
app.use(static(path.join(__dirname, "./front")));

app.use(bodyParser());
app.use(compose(MD));

app.on("error", (err, ctx) => {
  console.log(err);
  if (ctx) {
    ctx.body = {
      code: 9999,
      msg: `程序运行时报错：${err.message}`,
    };
  }
});

app.listen(config.port, () => {
  console.log(chalk.green(`应用启动地址为 http://localhost:${config.port}`));
});
