module.exports = {
    getListOfPlans: function(callback) {
        callback('{"currentPlans":[{"id":0, "name":"Example current plan"}], "pastPlans":[{"id":1, "name":"Example past plan"}]}', null);
    },
    getPlanById: function(callback, id) {
        if(id == 0) {
            callback('{"name":"Example plan", "exercises": [{"id":0, "name":"Deadlift", "desc":"Heavy ass shit.", "sets":3, "reps":8}]}', null);
        } else {
            callback(null, 'The plan doesn\'t exist.');
        }
    },
    createPlan: function(callback, plan) {
        // TODO: MongoLULZ
    }
};