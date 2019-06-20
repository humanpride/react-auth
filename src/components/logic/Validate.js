import $ from 'jquery';

function validateEmail(email)
{
    if (email.length > 0) {
        if (email.search(/^[-._+a-z0-9]+@(?:[a-z0-9][-a-z0-9]*\.)+[a-z]{2,6}$/i) === -1) {
            return 0;
        }

        let result = 0;
        $.ajax({
            type: 'POST',
            url: '/back-end/controllers/RegistrationController.php',
            data: 'check=1&email='+email,
            async: false,
            success: function(response) {
                if (response === 'ok') {
                    result = 1;
                } else if (response === 'user already exists') {
                    result = -1;
                } else {
                    result = response;
                }
            }
        });
        
        return result;
    }

    return 1;
}

function validatePass(password)
{
    if (password.length < 8)
        return false;
    
    return true;
}

function confirmPass(password, confirm)
{
    return password === confirm ? true : false;
}

export { validateEmail, validatePass, confirmPass };
