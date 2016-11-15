function signup(username, password) {
    $.ajax({
            type: 'POST',
            url: '/api/saveUser',
            contentType: 'application/json; charset=utf-8',
            data: '{"username": "' + username + '", "password" : "' + password + '"}',
            timeout: 3000,
            success: function(data, textStatus, jQxhr) {
                alert('User added!');
                window.location.replace('index');
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert('An error occured: ' + errorThrown);
            }
        });
}

$(document).ready(function() {
    $('#signupButton').click(function () {
        var username = $('#usernameInput').val();
        var password = $('#passwordInput').val();
        
        if(username != null && password != null) {
            signup(username, password);
        } else {
            alert('Please enter username and password!');
        }        
    });
});