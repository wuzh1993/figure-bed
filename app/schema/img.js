const Joi = require("joi");

const uploadImg = {
//   body: Joi.object({
//     file: Joi.required(),
//   }),
};

const getImgList = {
  body: Joi.object({
    current: Joi.number().required(),
    pageSize: Joi.number().required(),
  }),
};

const deleteImg = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const renameImg = {
  body: Joi.object({
    oldName: Joi.string().required(),
    newName: Joi.string().required(),
  }),
};

module.exports = {
  uploadImg,
  getImgList,
  deleteImg,
  renameImg,
};
