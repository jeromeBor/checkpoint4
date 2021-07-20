const newsRouter = require('./drawings');
const tagsRouter = require('./tags');

module.exports = (app) => {
  app.use('/drawings', newsRouter);
  app.use('/tags', tagsRouter);
};
