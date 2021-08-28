const fs = require("fs");
const path = require("path");

function computePath(name, extentName) {
  return path.join(
    __dirname,
    "../static/images/",
    `${name}.${extentName}`
  );
}
function deleteFile(name, extentName) {
  const imgUrl = computePath(name, extentName);
  if (fs.existsSync(imgUrl) && !fs.statSync(imgUrl).isDirectory()) {
    fs.unlinkSync(imgUrl);
  }
}
function renameFile(oldName, newName, extentName) {
  const oldUrl = computePath(oldName, extentName);
  const newUrl = computePath(newName, extentName);
  fs.renameSync(oldUrl, newUrl);
}
function getFileStream(name, extentName) {
  const imgUrl = computePath(name, extentName);
  const stream = fs.readFileSync(imgUrl);
  return stream;
}

module.exports = { computePath, deleteFile, renameFile, getFileStream };
