const connection = require("../db");
const db = connection.promise();

const getAllAdminQuery = () => {
  return db.query("SELECT * FROM admin");
};
const getOneAdminQuery = (value) => {
  return db.query("SELECT * FROM admin WHERE id = ? ", [value]);
};
const postOneAdminQuery = (values) => {
  return db.query("INSERT INTO admin SET ?", [values]);
};
const updateOneAdminQuery = (id, values) => {
  return db.query("UPDATE drawings SET ? WHERE id = ? ", [values, id]);
};
const deleteOneAdminQuery = (values) => {
  return db.query("DELETE FROM admin WHERE id = ? ", [values]);
};
// const loginAdmin = (values) => {
//   return db.query("SELECT * FROM admin WHERE mail = ?", [values]);
// };

module.exports = {
  getAllAdminQuery,
  getOneAdminQuery,
  postOneAdminQuery,
  //   loginAdmin,
  updateOneAdminQuery,
  deleteOneAdminQuery,
};
