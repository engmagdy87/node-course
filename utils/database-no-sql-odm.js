const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'node-js';
let _db;

const mongooseConnect = async () => {
  _db = await mongoose.connect(`${url}/${dbName}`);
  console.log('Connected successfully to server');

  return _db;
};

const getDb = () => {
  if (_db) return _db;
  throw 'No Database Found';
};

exports.mongooseConnect = mongooseConnect;
exports.getDb = getDb;
