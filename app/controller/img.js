const imgModel = require("../modules/img");
const path = require("path");
const config = require("../config");
const solveFs = require("../utils/solveFs");

class Img {
  async uploadImg(ctx, next) {
    const { username, file } = ctx;
    const newImg = new imgModel({
      username,
      name: file.filename.split(".")[0],
      size: file.size,
      type: path.extname(file.originalname).substr(1),
      path: `${config.host}:${config.port}/images/${file.filename}`,
      originalPath: "/static/images/" + file.filename,
    });
    await newImg.save();
    ctx.body = {
      result: true,
      message: "上传成功",
    };
  }

  async getImgList(ctx) {
    const {
      username,
      request: {
        body: { current, pageSize },
      },
    } = ctx;
    const imgs = await imgModel
      .find(
        { username },
        {
          username: false,
          originalPath: false,
          _id: false,
          autoIndex: false,
          __v: false,
        }
      )
      .skip((current - 1) * pageSize)
      .limit(pageSize || 15)
      .sort({ createdAt: -1 });
    const count = await imgModel.find({ username }).countDocuments();
    ctx.body = {
      totalCount: count,
      list: imgs,
      result: true,
      message: "获取列表成功1",
    };
  }

  async deleteImg(ctx) {
    const {
      request: {
        body: { name },
      },
    } = ctx;
    let target = await imgModel.find({ name });
    if (target.length) {
      const { type } = target[0];
      solveFs.deleteFile(name, type);
      await imgModel.deleteOne({ name });
      ctx.body = {
        result: true,
        message: "删除成功",
      };
    }
  }

  async renameImg(ctx) {
    const {
      request: {
        body: { oldName, newName },
      },
    } = ctx;
    if (!oldName || !newName) {
      ctx.utils.assert(false, ctx.utils.throwError(-1, "名称不能为空"));
      return;
    }
    if (oldName === newName) {
      ctx.utils.assert(false, ctx.utils.throwError(-1, "名称相同"));
      return;
    }
    let target = await imgModel.find({ name: oldName });
    if (target.length) {
      const { name, type } = target[0];
      solveFs.renameFile(name, newName, type);
      await imgModel.updateOne(
        { name: oldName },
        {
          $set: {
            name: newName,
            path: `${config.host}:${config.port}/images/${newName}.${type}`,
          },
        }
      );
      ctx.body = {
        result: true,
        message: "重命名成功",
      };
    }
  }
}

module.exports = new Img();
