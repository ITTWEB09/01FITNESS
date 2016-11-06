$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/workoutPlan',
        contentType: 'application/json; charset=utf-8',
        timeout: 3000,
        success: function(data) {
            var currentPrograms = $('#currentPrograms');
            var pastPrograms = $('#pastPrograms')
            var json = JSON.parse(data);
            
            json.currentPlans.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element.id;
                opt.innerHTML = element.name;
                
                currentPrograms.append(opt);
            }, this);
            
            json.pastPlans.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element.id;
                opt.innerHTML = element.name;
                
                pastPrograms.append(opt);
            }, this);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert('An error occured: ' + errorThrown);
        }
    });

    $('#currentPrograms').click(function() {
        $.ajax({
            type: 'GET',
            url: '/api/workoutPlan/' + this.value, //Hopefully value of plan?
            contentType: 'application/json; charset=utf-8',
            timeout: 3000,
            success: function(data) {
                //TODO load data into table
                console.log(data);
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert('An error occured: ' + errorThrown);
            }
        });
    });

    $('#createProgram').click(function () {
        console.log("Create clicked");
        window.location.replace("create");
    });

    $('#logProgram').click(function () {
        return;
    });

});