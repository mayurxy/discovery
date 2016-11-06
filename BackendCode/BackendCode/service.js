var express = require('express');
var router = express.Router();
var dburl = require('../conf/db_conf.json').url;
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {
  res.render('This is service page');
});

// Get service info API
router.get('/serviceinfo', function(req, res, next) {
  var response = {};
  MongoClient.connect(dburl, function(dberr, db){
    if(!dberr){
      
        var collection = db.collection('serviceinfo');

        collection.find().toArray(function(err,docs){
            if(err){
                response.status = 0;
                response.error = err;
                response.msg = "Something went wrong";

                res.send(JSON.stringify(response));
            }

            if(docs){
                res.send(JSON.stringify(docs));
            }
            else
            {
                response.status = 1;
                response.error = 'No service found';
                response.msg = 'No service found';
                res.send(JSON.stringify(response));
            }            
        });
    }
    else
    {
        response.status = 0;
        response.error = dberr;
        response.msg = "Something went wrong";
        res.send(JSON.stringify(response));
    }
    
  });
});

router.get('/serviceinfo/:search', function(req, res, next) {
  var response = {};
  var search = req.params.search;
  MongoClient.connect(dburl, function(dberr, db){
    if(!dberr){
      
        var collection = db.collection('serviceinfo');

        collection.find({$text:{$search:search}}).toArray(function(err,docs){
            if(err){
                response.status = 0;
                response.error = err;
                response.msg = "Something went wrong";

                res.send(JSON.stringify(response));
            }

            if(docs){
                res.send(JSON.stringify(docs));
            }
            else
            {
                response.status = 1;
                response.error = 'No service found';
                response.msg = 'No service found';
                res.send(JSON.stringify(response));
            }            
        });
    }
    else
    {
        response.status = 0;
        response.error = dberr;
        response.msg = "Something went wrong";
        res.send(JSON.stringify(response));
    }
    
  });
});

router.post('/addservice', function(req, res, next) {
  var info = {
      name : req.body.name,
      image : req.body.image,
      description : req.body.description,
      location : req.body.location,
      contact : { person : req.body.person, phone : req.body.phone},
      category : req.body.category

  }
  var response = {};
  MongoClient.connect(dburl, function(dberr, db){
    if(!dberr){
      
        var collection = db.collection('serviceinfo');

        collection.find().toArray(function(err,docs){
            if(err){
                response.status = 0;
                response.error = err;
                response.msg = "Something went wrong";

                res.send(JSON.stringify(response));
            }

            if(docs){
                res.send(JSON.stringify(docs));
            }
            else
            {
                response.status = 1;
                response.error = 'No service found';
                response.msg = 'No service found';
                res.send(JSON.stringify(response));
            }            
        });
    }
    else
    {
        response.status = 0;
        response.error = dberr;
        response.msg = "Something went wrong";
        res.send(JSON.stringify(response));
    }
    
  });
});

module.exports = router;