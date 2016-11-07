var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var connUrl = 'mongodb://localhost:27017/db';

function doSomeWork(successCB, errorCB) {
    MongoClient.connect(connUrl, function (err, db) {
        if (err) {
            errorCB('Unable to connect to the mongoDB server. Error:' + err);
        } else {
            console.log('Connection established to', connUrl);

            successCB(db);
            db.close();
        }
    });
}

module.exports = {
    getListOfPlans: function(callback) {
        doSomeWork(function(db) {
                db.collection('workoutPlans').find({}, {_id : 1, name: 1, completed: 1}).toArray(function(err, docs) {
                    if(err) {
                        callback(null, err);
                    } else {
                        console.log(docs);
                        callback(docs, null);
                    }
                });
            }, function(err) {
                console.log(err);
            });
    },
    getPlanById: function(callback, id) {
        doSomeWork(function(db) {
                db.collection('workoutPlans').findOne({_id: mongodb.ObjectId(id)}, {exercises: 1, _id: 0}, function(err, doc) {
                    if(err) {
                        callback(null, err);
                    } else {
                        console.log(doc);
                        callback(doc, null);
                    }
                });
            }, function(err) {
                console.log(err);
            });
    },
    createPlan: function(callback, plan) {
        doSomeWork(function(db) {
            var collection = db.collection('workoutPlans');

            collection.insert(plan, function(err, result) {
                if(err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function(err) {
            console.log(err);
        });
    },
    complete: function(callback, id){
        doSomeWork(function(db) {
            var collection = db.collection('workoutPlans');

            collection.updateOne({_id: mongodb.ObjectId(id)}, {$set: {completed: 1}}, null, function(err, r){
                if(err){
                    callback(err);
                } else {
                    callback(null);
                }
            });
        })
    }
};