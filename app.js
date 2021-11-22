const express = require('express');
const db = require('./utils/database');
const setAssociations = require('./associations');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);

setAssociations();

const startServer = async () => {
  try {
    await db.sync();
    await app.listen(PORT, () =>
      console.log(`Listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
