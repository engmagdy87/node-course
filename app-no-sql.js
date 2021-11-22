const express = require('express');
const { mongodbConnect } = require('./utils/database-no-sql');

const userRoutes = require('./routes/user-no-sql');
// const bookRoutes = require('./routes/book');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(userRoutes);
// app.use(bookRoutes);

const startServer = async () => {
  try {
    await mongodbConnect();
    app.listen(PORT, () =>
      console.log(`Listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
