const Router = require("koa-router");
const { upload } = require("../utils/mdMulter");
const router = new Router({
  prefix: "/api",
});

const routeList = require("./routes");
const paramValidator = require("../middlewares/paramValidator");

routeList.forEach((route) => {
  const { method, path, controller, valid } = route;
  if (path === "/img/uploadImg") {
    router[method](
      path,
      upload.single("file"),
      paramValidator(valid),
      controller
    );
  } else {
    router[method](path, paramValidator(valid), controller);
  }
});

// router.use("/user", user.routes(), user.allowedMethods());
// router.use("/img", img.routes(), img.allowedMethods());

module.exports = router;
