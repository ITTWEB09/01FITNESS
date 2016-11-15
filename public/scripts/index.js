function updateTable(select, successCallback) {
    $.ajax({
            type: 'GET',
            url: '/api/workoutPlan/' + select.val(),
            contentType: 'application/json; charset=utf-8',
            timeout: 3000,
            success: function(data) {
                $('#exerciseTable tr').slice(1).remove();

                var json = JSON.parse(data);
                
                json.exercises.forEach(function(element) {
                    var name = element.name;
                    var desc = element.desc;
                    var sets = element.sets;
                    var reps = element.reps;
                    
                    $('#exerciseTable').append($(document.createElement('tr'))
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

function completePlan(id){
    $.ajax({
        type: 'PUT',
        url: '/api/workoutPlan/complete/' + id,
        timeout: 3000,
        success: function(data) {
            alert('Plan updated!')
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert('An error occured: ' + errorThrown);
        }
    });
}

// Source: http://stackoverflow.com/questions/2144386/javascript-delete-cookie
function deleteCookie() {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var expires = "; expires=" + date.toGMTString();

    document.cookie = "myToken=" + expires + "; path=/";
}

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/workoutPlan',
        contentType: 'application/json; charset=utf-8',
        timeout: 3000,
        success: function(data) {
            var currentPrograms = $('#currentPrograms');
            var pastPrograms = $('#pastPrograms');
            
            var json = JSON.parse(data);

            var current = [];
            var past = [];

            json.forEach(function(el) {
                if(el.completed == '0') {
                    current.push(el);
                } else {
                    past.push(el);
                }
            });

            current.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element._id;
                opt.innerHTML = element.name;
                
                currentPrograms.append(opt);
            }, this);
            
            past.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element._id;
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

    $('#createProgram').click(function() {
        window.location.href = "/create";
    });

    $('#logProgram').click(function() {
        var currentPrograms = $('#currentPrograms').val();

        if(!currentPrograms || currentPrograms == 0) {
            alert('No current plan selected!');
        } else {
            completePlan(currentPrograms);
        }
    });

    $('#logout').click(function() {
        deleteCookie();
        window.location.href = "/login";
    });
});