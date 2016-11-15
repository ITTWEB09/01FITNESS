// Source: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function doLogin(username, password) {
    $.ajax
    ({
        type: "POST",
        url: "/auth",
        dataType: 'text',
        contentType: 'application/json; charset=utf-8',
        data: '{"username": "' + username + '", "password" : "' + password + '"}',
        success: function (data){
            createCookie(data, null);

            var redirectUrl = getUrlParameter('redirect');
            document.location.href = (redirectUrl ? redirectUrl : "index");
        }
    });
}

// Source: http://stackoverflow.com/questions/2144386/javascript-delete-cookie
function createCookie(value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = "myToken=" + value + expires + "; path=/";
}

$(document).ready(function() {
    $('#submitButton').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();

        doLogin(username, password);
    });

    $('#signupButton').click(function() {
    window.location.href = "/signup";
    }); 
});