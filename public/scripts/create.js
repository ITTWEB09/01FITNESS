$(document).ready(function() {
    function validateAddData(name, desc, sets, reps) {
        return name && desc && sets && reps;
    }

    function validatePlan() {
        if($('#exerciseTable td').length == 0) {
            alert('You cannot submit an empty plan.');
            return;
        }

        var planName = $('#planNameInput').val();

        if(!planName) {
            alert('The plan needs a name.');
            return;
        }

        return planName;
    }

    function getPlanData(planName) {
        var table = $('#exerciseTable');
        var dataObject = {
            name: planName,
            exercises: []
        };

        // Source: http://stackoverflow.com/questions/17120633/loop-through-each-html-table-column-and-get-the-data-using-jquery
        table.find('tr').each(function (i, el) {
            var $tds = $(this).find('td'),
                id = i,
                name = $tds.eq(0).text(),
                desc = $tds.eq(1).text(),
                sets = parseInt($tds.eq(2).text(), 10),
                reps = parseInt($tds.eq(3).text(), 10);
            
            dataObject.exercises.push({
                id: id,
                name: name,
                desc: desc,
                sets: sets,
                reps: reps
            });
        });

        return JSON.stringify(dataObject);
    }

    $('#addButton').click(function () {
        var name = $('#nameInput').val();
        var desc = $('#descInput').val();
        var sets = $('#setsInput').val();
        var reps = $('#repsInput').val();

        if(validateAddData(name, desc, sets, reps)) {
            $('#exerciseTable').append($(document.createElement('tr'))
                .append($(document.createElement('td')).html(name))
                .append($(document.createElement('td')).html(desc))
                .append($(document.createElement('td')).html(sets))
                .append($(document.createElement('td')).html(reps)));
        } else {
            alert('Some exercise data was invalid.');
        }
    });

    $('#finishButton').click(function () {
        var planName = validatePlan();

        if(!planName) {
            return;
        }

        var data = getPlanData(planName);

        $.ajax({
            type: 'POST',
            url: '/api/workoutPlan',
            contentType: 'application/json; charset=utf-8',
            data: data,
            timeout: 3000,
            success: function(data, textStatus, jQxhr) {
                alert('Success!');
                window.location.replace('index');
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert('An error occured: ' + errorThrown);
            }
        });
    });
});