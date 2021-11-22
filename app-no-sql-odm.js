const express = require('express');
const { mongooseConnect } = require('./utils/database-no-sql-odm');

const userRoutes = require('./routes/user-no-sql-odm');
const bookRoutes = require('./routes/book-no-sql-odm');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);

const startServer = async () => {
  try {
    await mongooseConnect();
    app.listen(PORT, () =>
      console.log(`Listening on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
