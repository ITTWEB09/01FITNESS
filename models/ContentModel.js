module.exports = {
    getListOfPlans: function(callback) {
        callback(`
            {
                "currentPlans":
                    [
                        {
                            "id":0, 
                            "name":"Example current plan 1"
                        }, 
                        {
                            "id":2,
                            "name":"Example current plan 2"
                        }
                    ], 
                "pastPlans":
                    [
                        {
                            "id":1, 
                            "name":"Example past plan 1"
                        }, 
                        {
                            "id":3, 
                            "name":"Example past plan 2"
                        }
                    ]
            }`, null);
    },
    getPlanById: function(callback, id) {
        if(id == 0) {
            callback(`
            {  
                "name":"Example current plan 1",
                "exercises":[  
                    {  
                        "id":0,
                        "name":"Deadlift",
                        "desc":"Heavy ass shit.",
                        "sets":3,
                        "reps":4
                    },
                    {  
                        "id":1,
                        "name":"Pulldown",
                        "desc":"Lateral action.",
                        "sets":3,
                        "reps":8
                    }
                ]
            }`, null);
        } else if(id == 1) {
            callback(`
            {  
                "name":"Example past plan 1",
                "exercises":[  
                    {  
                        "id":0,
                        "name":"Dumbell press",
                        "desc":"Great exercise for building all kinds of chest.",
                        "sets":3,
                        "reps":10
                    },
                    {  
                        "id":1,
                        "name":"Curls",
                        "desc":"For the girls.",
                        "sets":3,
                        "reps":10
                    }
                ]
            }`, null); 
        } else {
            callback(null, 'The plan doesn\'t exist.');
        }
    },
    createPlan: function(callback, plan) {
        // TODO: MongoLULZ
    }
};