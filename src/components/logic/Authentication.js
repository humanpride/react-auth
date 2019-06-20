import $ from 'jquery';

function auth(login, password)
{
    let result = false;
    $.ajax({
        type: "POST",
        url: "/back-end/controllers/AuthController.php",
        data: "login="+login+"&password="+password,
        async: false,
        success: function (response) {
            if (response !== 'denied') {
                const tokenArr = response.split(" && ");
                localStorage.setItem('accessToken', tokenArr[0]);
                localStorage.setItem('refreshToken', tokenArr[1]);
                result = true;
            }
        },
        error: function (xhr, status) {
            
        }
    });

    return result;
}

export { auth };
