const connection = require('../db-config');

const postTagQuery = (values) => {
  return connection.query('INSERT INTO tags SET ?', [values]);
};
const getAllTagsQuery = () => {
  return connection.query('SELECT * FROM tags');
};
const getOneTagQuery = (value) => {
  return connection.query('SELECT * FROM tags WHERE id = ? ', [value]);
};

const updateTagQuery = (id, values) => {
  return connection.query('UPDATE tags SET ? WHERE id = ?', [values, id]);
};
const deleteTagQuery = (values) => {
  return connection.query('DELETE FROM tags WHERE id = ?', [values]);
};
module.exports = {
  postTagQuery,
  getAllTagsQuery,
  getOneTagQuery,
  updateTagQuery,
  deleteTagQuery,
};
