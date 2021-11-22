const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'node-js';
let _db;

const mongodbConnect = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  _db = client.db(dbName);

  return _db;
};

const getDb = () => {
  if (_db) return _db;
  throw 'No Database Found';
};

exports.mongodbConnect = mongodbConnect;
exports.getDb = getDb;
