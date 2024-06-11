const { MongoClient, ServerApiVersion } = require('mongodb');


//连接对象
let dbConnection;
//通过atlas连接MongoDB
let uri = 'mongodb+srv://weizhu:19990120abc@cluster0.b5ubmvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri).then((client) => {
            dbConnection = client.db();
            return cb();
        }).catch(err => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => dbConnection
}