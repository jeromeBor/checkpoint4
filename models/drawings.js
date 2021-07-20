const connection = require('../db-config');

const postOneDrawingQuery = (values) => {
  return connection.query('INSERT INTO drawings SET ?', [values]);
};
const getAllDrawingsQuery = () => {
  return connection.query('SELECT * FROM drawings ORDER BY dateOfWrite desc');
};
const getOneDrawingQuery = (value) => {
  return connection.query('SELECT * FROM drawings WHERE id = ? ', [value]);
};

const updateOneDrawingQuery = (id, values) => {
  return connection.query('UPDATE drawings SET ? WHERE id = ?', [values, id]);
};
const deleteOneDrawingQuery = (values) => {
  return connection.query('DELETE FROM drawings WHERE id = ?', [values]);
};
module.exports = {
  postOneDrawingQuery,
  getAllDrawingQuery,
  getOneDrawingQuery,
  updateOneDrawingQuery,
  deleteOneDrawingQuery,
};
