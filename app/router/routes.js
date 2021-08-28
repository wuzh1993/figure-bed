const { img, user } = require("../controller");
const { scmUser, scmImg } = require("../schema");
const routes = [
  {
    method: "post",
    path: "/user/doLogin",
    valid: scmUser.loginIn,
    controller: user.loginIn,
    name: "登录",
  },
  {
    method: "post",
    path: "/img/uploadImg",
    valid: scmImg.uploadImg,
    controller: img.uploadImg,
    name: "上传图片",
  },
  {
    method: "post",
    path: "/img/getImgList",
    valid: scmImg.getImgList,
    controller: img.getImgList,
    name: "获取图片列表",
  },
  {
    method: "post",
    path: "/img/deleteImg",
    valid: scmImg.deleteImg,
    controller: img.deleteImg,
    name: "删除图片",
  },
  {
    method: "post",
    path: "/img/renameImg",
    valid: scmImg.renameImg,
    controller: img.renameImg,
    name: "重命名图片",
  },
];

module.exports = routes;
