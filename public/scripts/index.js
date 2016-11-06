function updateTable(select, successCallback) {
    $.ajax({
            type: 'GET',
            url: '/api/workoutPlan/' + select.val(),
            contentType: 'application/json; charset=utf-8',
            timeout: 3000,
            success: function(data) {
                //Not working as intended. Need to reset table
                $('#mainTable tr').slice(1).remove();
                               
                var json = JSON.parse(data);
                console.log(json);
                
                json.exercises.forEach(function(element) {
                    var name = element.name;
                    var desc = element.desc;
                    var sets = element.sets;
                    var reps = element.reps;
                    
                    $('#mainTable').append($(document.createElement('tr'))
                        .append($(document.createElement('td')).html(name))
                        .append($(document.createElement('td')).html(desc))
                        .append($(document.createElement('td')).html(sets))
                        .append($(document.createElement('td')).html(reps)));
                });

                if(successCallback) {
                    successCallback();
                }
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert('An error occured: ' + errorThrown);
            }
        });
}

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

    $('#currentPrograms').change(function() {
        updateTable($(this), function() {
            $('#pastPrograms')[0].selectedIndex = 0;
        });
    });

    $('#pastPrograms').change(function() {
        updateTable($(this), function() {
            $('#currentPrograms')[0].selectedIndex = 0;
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