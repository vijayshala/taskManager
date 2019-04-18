//const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient
const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL , {useNewUrlParser : true} , (error , client)=>{
    if(error){
        return console.log(error)
    }

    const db = client.db(databaseName)
    
    // db.collection('user').insertOne({
    //     name : "Keshav Garg",
    //     age : "27"
    // } , (error , result) =>{
    //     if(error) {
    //         return console.log("unable to insert data in collection")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('user').insertMany([{
    //     name : "Keshav Garg",
    //     age : 27
    // } ,{
    //     name : "tushar",
    //     age : 27
    // }] , (error , result) =>{
    //     if(error) {
    //         return console.log("unable to insert data in collection")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('task').insertMany([{
    //     description : "Task 1",
    //     completed : true
    // } ,{
    //     description : "Task 2",
    //     completed : true
    // } ,{
    //     description : "Task 3",
    //     completed : true
    // }] , (error , result) =>{
    //     if(error) {
    //         return console.log("unable to insert data in collection")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('user').findOne({name : "Keshav Garg"} , (error , result) => {
    //     if(error) {
    //         return console.log("Unable to fetch data")
    //     }
    //     console.log(result)
    // })

    // db.collection('user').findOne({_id : new ObjectID("5ca9d6985f0bcc0ab8a7910c")} , (error , result) => {
    //     if(error) {
    //         return console.log("Unable to fetch data")
    //     }
    //     console.log(result)
    // })


    //find returns cursor
    // db.collection("user").find({name : "Keshav Garg"}).toArray((error , user) => {
    //     if(error) {
    //         return console.log("Unable to fetch data")
    //     }
    //     console.log(user)
    // })

    //Check various update operators
    // db.collection('user').updateOne({
    //     age :  27
    // } ,{
    //     $inc :{
    //         age : 2
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).then((error)=>{
    //     console.log(error)
    // })

    // db.collection('user').deleteMany({
    //     age :  29
    // }).then((result)=>{
    //     console.log(result)
    // }).then((error)=>{
    //     console.log(error)
    // })
})