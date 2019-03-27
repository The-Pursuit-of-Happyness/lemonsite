const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function handleData(callback){
    MongoClient.connect(url,(err,database) =>{
        const myAwesomeDB = database.db('admin')
        let collection = myAwesomeDB.collection('user');
        callback(collection)
    });
}

module.exports = handleData;

