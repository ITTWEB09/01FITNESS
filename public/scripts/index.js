$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/getList',
        contentType: 'application/json; charset=utf-8',
        data: data,
        timeout: 3000,
        success: function(data, textStatus, jQxhr) {
            var currentPrograms = $('#currentPrograms');
            //var pastPrograms = $('#pastPrograms')

            data.forEach(function(element) {
                var opt = document.createElement('option');
                opt.value = element.id;
                opt.innerHTML = element.name;
                
                currentPrograms.append(opt);
            }, this);
            
            /*for (var i = 0; i < 3; i++){
                var opt = document.createElement('option');
                var opt2 = document.createElement('option');
                opt.value = i;
                opt2.value = i;
                
                opt.innerHTML = "Test " + i;
                opt2.innerHTML = "PastTest " + i;
                
                currentPrograms.append(opt);
                pastPrograms.append(opt2);
            }*/
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert('An error occured: ' + errorThrown);
        }
    });

    
});

$('#currentPrograms').on('change', function() {
    $.ajax({
        type: 'GET',
        url: '/api/getById' + this.value, //Hopefully value of plan?
        contentType: 'application/json; charset=utf-8',
        data: data,
        timeout: 3000,
        success: function(data, textStatus, jQxhr) {
            //TODO load data into table
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert('An error occured: ' + errorThrown);
        }
    });
});

$('#createProgram').click(function () {
    return;
});

$('#logProgram').click(function () {
    return;
});
