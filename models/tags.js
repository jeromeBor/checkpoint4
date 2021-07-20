const connection = require('../db-config');

const postOneTagQuery = (values) => {
  return connection.query('INSERT INTO tags SET ?', [values]);
};
const getAllTagsQuery = () => {
  return connection.query('SELECT * FROM tags');
};
const getOneTagQuery = (value) => {
  return connection.query('SELECT * FROM tags WHERE id = ? ', [value]);
};

const updateOneTagQuery = (id, values) => {
  return connection.query('UPDATE tags SET ? WHERE id = ?', [values, id]);
};
const deleteOneTagQuery = (values) => {
  return connection.query('DELETE FROM tags WHERE id = ?', [values]);
};
module.exports = {
  postOneTagQuery,
  getAllTagsQuery,
  getOneTagQuery,
  updateOneTagQuery,
  deleteOneTagQuery,
};
