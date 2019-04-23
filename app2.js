const express = require('express');
const app=express();
var morgan = require('morgan');
const port= 8000;
var dataLayer=require('./dataLayer')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(express.static('public'));
dataLayer.init(function(){
    console.log("init");
    app.listen(process.env.PORT);
    //app.listen(port);
});

app.post('/addTask', function(req,res){
    if(req.body && typeof req.body.name != 'undefined' ){

        var task  = {
            name : req.body.name,
            done : false,
            liste_id : req.body.identifiant
        };
        dataLayer.insertTask(task, function(){
            var liste = {
                liste_id : req.body.identifiant
            }
            dataLayer.getTaskSet(liste,function(dtSet){
                res.send(dtSet);
            });
        });
    }
    else{

        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});


app.post('/getTaskSet', function(req,res){
    var id = {
        liste_id : req.body.identifiant
    }
    dataLayer.getTaskSet(id,function(dtSet){
        res.send(dtSet);
    });
});


app.get('/getListTask', function(req,res)
{
    dataLayer.getListTask(function(dtSet)
    {
        res.send(dtSet);
    });
});


app.post('/deleteTask', function(req, res){
    var task = {    _id : req.body.identifiant  };
    dataLayer.deleteTask(task, function(){
        var liste = {
            liste_id : req.body.liste_id
        };
        dataLayer.getTaskSet(liste,function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post('/updateTask', function (req, res){
    var id = {    _id : req.body.identifiant  };
    var task = {name : req.body.text};
    dataLayer.updateTask(id,task, function(){
        var liste = {
            liste_id : req.body.listeid
        };
        dataLayer.getTaskSet(liste,function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post('/updateDone', function (req, res){
    var id = {    _id : req.body.identifiant  };
    var task = {done : req.body.done};
    dataLayer.updateTask(id,task, function(){
        var liste = {
            liste_id : req.body.listeid
        };
        dataLayer.getTaskSet(liste,function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post('/deleteList', function(req, res){
    var list = {
        _id : req.body.identifiant_li
    };
    dataLayer.deleteList(list, function(){
        dataLayer.getListTask(function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post('/addList', function(req, res){
    console.log(req);
    var list = {
        nomList : req.body.nom_List,
        username : req.body.username
    };

    dataLayer.addList(list,function(){
        dataLayer.getListTask(function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post('/connexion', function(req, res){
    var id = {
        username : req.body.user,
        password : req.body.passwrd
    };

    dataLayer.connexion(id, function(dtSet){
        res.send(dtSet);
    });
});

app.post('/verif', function(req, res){
    var id = {
        username : req.body.user,
    };

    dataLayer.connexion(id,function(dtSet){
        res.send(dtSet); 
    });
});

app.post('/inscription', function(req, res){
    var id = {
        username : req.body.user,
        password : req.body.passwrd
    };

    dataLayer.inscription(id, function(dtSet){
        res.send(dtSet);
    });
});