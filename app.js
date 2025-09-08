
const express = require('express');
const postsRouter = require('./routes/posts');
const connectDB = require('./config/db.config');

const app = express();
app.use(express.json());
app.use('/api/posts', postsRouter);

connectDB().then(() => {
  app.listen(8000, () => console.log('Server running on port 8000 (MongoMemoryServer)'));
}).catch(err => console.error(err));
