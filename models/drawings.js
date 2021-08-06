const connection = require('../db');
const db = connection.promise();

const postOneDrawingQuery = (values) => {
  return db.query('INSERT INTO drawings SE  T ?', [values]);
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
const searchDrawingByName = (values) => {
  return db.query(
    "SELECT * FROM drawings WHERE title LIKE '%drawingName%' = ?",
    // 'SELECT * FROM drawings d JOIN tags t ON t.id=d.tagsId WHERE t.title = ?',
    [values]
  );
};
module.exports = {
  postOneDrawingQuery,
  getAllDrawingsQuery,
  getOneDrawingQuery,
  updateOneDrawingQuery,
  deleteOneDrawingQuery,
  searchDrawingByName,
};
