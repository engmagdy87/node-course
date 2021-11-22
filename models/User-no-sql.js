const mongodb = require('mongodb');
const { getDb } = require('../utils/database-no-sql');
class User {
  constructor(fullName, username, password) {
    this.fullName = fullName;
    this.username = username;
    this.password = password;
  }
  addUser() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then((result) => {
        console.log('====================================');
        console.log('result');
        console.log(result);
        console.log('====================================');
      })
      .catch((err) => {
        console.log('====================================');
        console.log('err');
        console.log(err);
        console.log('====================================');
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('users')
      .find()
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('====================================');
        console.log('err');
        console.log(err);
        console.log('====================================');
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('====================================');
        console.log('err');
        console.log(err);
        console.log('====================================');
      });
  }

  updateUser(userId) {
    const db = getDb();
    console.log('====================================');
    console.log(userId);
    console.log(this);
    console.log('====================================');
    return db
      .collection('users')
      .updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: this })
      .then((result) => {
        console.log('====================================');
        console.log('result');
        console.log(result);
        console.log('====================================');
      })
      .catch((err) => {
        console.log('====================================');
        console.log('err');
        console.log(err);
        console.log('====================================');
      });
  }

  static deleteById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .deleteOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        console.log('====================================');
        console.log('result');
        console.log(result);
        console.log('====================================');
      })
      .catch((err) => {
        console.log('====================================');
        console.log('err');
        console.log(err);
        console.log('====================================');
      });
  }
}

module.exports = User;
