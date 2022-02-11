const express = require("express");
const {
  getAllAdmin,
  postOneAdmin,
  loginAdmin,
  getOneAdminById,
  updateOneAdmin,
  deleteOneAdmin,
} = require("../controllers/admin.js");
const { validateToken } = require("../middleware/JWT.js");

const router = express.Router();
router.get("/", validateToken, getAllAdmin);
router.get("/:id", validateToken, getOneAdminById);
router.post("/login", loginAdmin);
router.post("/", postOneAdmin);
router.put("/:id", updateOneAdmin);
router.delete("/:id", deleteOneAdmin);
module.exports = router;
