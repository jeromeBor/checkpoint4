const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload");
    // req.file.path
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

module.exports = {
  upload,
  multer,
  storage,
};
