const connection = require('../db');
const db = connection.promise();

const postOneDrawingQuery = (values) => {
  return db.query('INSERT INTO drawings SET ?', [values]);
};
const getAllDrawingsQuery = () => {
  return db.query('SELECT * FROM drawings');
};
const getOneDrawingQuery = (value) => {
  return db.query('SELECT * FROM drawings WHERE id = ? ', [value]);
};
const updateOneDrawingQuery = (id, values) => {
  return db.query('UPDATE drawings SET ? WHERE id = ? ', [values, id]);
};
const deleteOneDrawingQuery = (values) => {
  return db.query('DELETE FROM drawings WHERE id = ? ', [values]);
};

module.exports = {
  postOneDrawingQuery,
  getAllDrawingsQuery,
  getOneDrawingQuery,
  updateOneDrawingQuery,
  deleteOneDrawingQuery,
};
