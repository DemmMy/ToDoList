var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://Demm:polytech@cluster0-3a1kp.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });
var db;

var dataLayer = {

    init : function(cb){

        // Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db('Polytech');
            cb();
        });

    },

    getListTask : function(cb){
        db.collection("List").find({}).toArray(function(err, docs)
        {
            cb(docs);
        });
    },

    getTaskSet : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        
        id.liste_id = new ObjectID(id.liste_id);
        db.collection("ListTodo").find(id).toArray(function(err, docs){
            cb(docs);
        });

    },


    insertTask : function(task, cb){

        ObjectID = require('mongodb').ObjectID;
        
        task.liste_id = new ObjectID(task.liste_id);
        db.collection("ListTodo").insertOne(task, function(err, result) {
            cb();
        });           
    },

    updateTask : function(id, task, cb){

        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id._id)
        };
        db.collection("ListTodo").updateOne(ident, {$set: task}, function(err, result) {
            cb();
        });           
    },
   
    deleteTask : function(task, cb){   
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(task._id)
        };
        db.collection("ListTodo").deleteOne(ident, function(err,result){
            cb();
        });
    },

    deleteList : function (list, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(list._id)
        };
        db.collection("List").deleteOne(ident, function(err,result){
            cb();
        });
    },

    addList : function(list, cb){
        db.collection("List").insertOne(list, function(err, result) {
            cb();
        }); 
    },

    connexion : function(id, cb){
        db.collection("Users").find(id).toArray(function(err, docs){
            cb(docs);
        });
    },

    inscription : function(id , cb){
        db.collection("Users").insertOne(id, function(err, result) {
            cb();
        }); 
    }

}

module.exports = dataLayer; 