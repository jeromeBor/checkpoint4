const express = require("express");
const {
  getAllAdmin,
  postOneAdmin,
  //   loginAdmin,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
} = require("../controllers/admin.js");

const router = express.Router();
router.get("/", getAllAdmin);
router.get("/:id", getOneAdmin);
// router.post("/", loginAdmin);
router.post("/", postOneAdmin);
router.put("/:id", updateOneAdmin);
router.delete("/:id", deleteOneAdmin);
module.exports = router;
