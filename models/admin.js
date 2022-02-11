const connection = require("../db");
const db = connection.promise();

const getAllAdminQuery = () => {
  return db.query("SELECT * FROM admin");
};
const getOneAdminByIdQuery = (value) => {
  return db.query("SELECT * FROM admin WHERE id = ? ", [value]);
};
const getOneAdminByMailQuery = (value) => {
  return db.query("SELECT mail, password, role FROM admin WHERE mail = ? ", [
    value,
  ]);
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
const loginAdminQuery = (value) => {
  return db.query("SELECT id, mail, role FROM admin WHERE mail = ? ", [value]);
};

module.exports = {
  getAllAdminQuery,
  getOneAdminByMailQuery,
  getOneAdminByIdQuery,
  postOneAdminQuery,
  loginAdminQuery,
  updateOneAdminQuery,
  deleteOneAdminQuery,
};
