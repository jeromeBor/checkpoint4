require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const drawingsRouter = require('./routes/drawings');
const tagsRouter = require('./routes/tags');

app.use('/drawings', drawingsRouter);
app.use('/tags', tagsRouter);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
