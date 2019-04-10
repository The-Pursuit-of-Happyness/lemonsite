const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://66.42.42.120:25434';

function handleData(callback) {
  MongoClient.connect(url, (err, database) => {
    const myAwesomeDB = database.db('admin')
    let collection = myAwesomeDB.collection('user');
    callback(collection)
  });
}

module.exports = handleData;