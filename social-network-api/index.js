const express = require('express');
const connectDB = require('./config/config');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

app.use('/posts', postsRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
