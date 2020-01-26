// CRUD create read update delete
// /home/shubhi3199/mongodb/bin/mongod --dbpath=/home/shubhi3199/mongodb-data

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);

        // db.collection('users').insertOne({
        //     name: 'raj',
        //     age: 23
        // }, (error, result) =>{
        //     if(error){
        //         return console.log(error)
        //     }
        //     console.log(result)
        // });

        // db.collection('tasks').insertMany([
        //     {
        //         task: 'complete nodejs',
        //         completed: false
        //     },
        //     {
        //         task: 'complete dataScience BootCamp',
        //         completed: false
        //     },
        //     {
        //         task: 'complete SIH research',
        //         completed: false
        //     }
        // ]);

    // db.collection('users').deleteMany({
    //     age: 23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     task: 'complete nodejs'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').findOne({
    //     name: 'Andrew'
    // }).then(result => console.log(result))
    //     .catch(error => console.log(error));

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e25ebfde09c2a13e51c494b')
    // },{
    //     $set:{
    //         name: 'Shubham'
    //     }
    // }).then(result => console.log(result))
    //     .catch((error => console.log(error)));

    db.collection('tasks').updateMany({
        completed: false
    },{
        $set:{
            completed: true
        }
    }).then(result => console.log(result))
        .catch(error => error);
});