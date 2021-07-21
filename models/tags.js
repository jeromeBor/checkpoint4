const connection = require('../db');
const db = connection.promise();

const postOneTagQuery = (values) => {
  return db.query('INSERT INTO tags SET ?', [values]);
};

const getAllTagsQuery = () => {
  return db.query('SELECT * FROM tags');
};

const getOneTagQuery = (value) => {
  return db.query('SELECT * FROM tags WHERE id = ? ', [value]);
};

const updateOneTagQuery = (id, values) => {
  return db.query('UPDATE tags SET ? WHERE id = ?', [values, id]);
};

const deleteOneTagQuery = (values) => {
  return db.query('DELETE FROM tags WHERE id = ?', [values]);
};

module.exports = {
  postOneTagQuery,
  getAllTagsQuery,
  getOneTagQuery,
  updateOneTagQuery,
  deleteOneTagQuery,
};
