const path = require("path");
const multer = require("@koa/multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../static/images`));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        path.extname(file.originalname).substr(1)
    );
  },
});
const upload = multer({ storage });
module.exports = {
  upload,
};
