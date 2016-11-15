var mongodb = require('mongodb');

var connUrl = 'mongodb://testuser:testpassword@ds139567.mlab.com:39567/ittwebdb';

function doSomeWork(successCB, errorCB) {
    mongodb.connect(connUrl, function (err, db) {
        if (err) {
            errorCB('Unable to connect to the mongoDB server. Error:' + err);
        } else {
            db.addListener("error", function(error){
                console.log(error);
            });

            console.log('Connection established to', connUrl);

            successCB(db);
            db.close();
        }
    });
}

module.exports = {
    saveNewUser: function(callback, userObj) {
        doSomeWork(function(db) {
            var collection = db.collection('users');

            collection.insert(userObj, function(err, result){
                    if(err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
        })
    },
    lookUpUser: function(callback, username, password) {
        doSomeWork(function(db) {
            db.collection('users').findOne({username: username, password: password}, function(err, doc) {
                if(err) {
                    callback(null, err);
                } else {
                    if(doc) {
                        callback(true, null);
                    } else {
                        callback(false, null);
                    }
                }
            });
        })                      
    },
    getListOfPlans: function(callback) {
        doSomeWork(function(db) {
            db.collection('workoutPlans').find({}, {_id : 1, name: 1, completed: 1}).toArray(function(err, docs) {
                    if(err) {
                        callback(null, err);
                    } else {
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