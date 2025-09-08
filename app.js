const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

const app = express();
app.use(express.json());
app.use('/api/posts', postsRouter);

mongoose.connect('mongodb://localhost:27017/postsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(8000, () => console.log('Server running on port 8000')))
  .catch(err => console.error(err));
