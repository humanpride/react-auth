import $ from 'jquery';

function AuthCheck()
{
    // проверка авторизации
    const accessToken = localStorage.getItem('accessToken');
    let result = false;
    if (accessToken) {
        $.ajax({
            type: "POST",
            url: "/back-end/controllers/AuthController.php",
            data: "signedIn=q&accessToken="+accessToken,
            async: false,
            success: function (response) {
                switch (response) {
                    case 'guest':
                        result = false;
                        break;
                    
                    case 'token expired':
                        const refreshToken = localStorage.getItem('refreshToken');
                        $.ajax({
                            type:"POST",
                            url: "/back-end/controllers/AuthController.php",
                            data: "signedIn=q&refreshToken="+refreshToken,
                            async: false,
                            success: function (response) {
                                if (response === 'guest') {
                                    result = false;
                                } else {
                                    const tokenArr = response.split(" && ");
                                    localStorage.setItem('accessToken', tokenArr[0]);
                                    localStorage.setItem('refreshToken', tokenArr[1]);
                                    result = true;
                                }
                            }
                        });
                        break;
                
                    case 'token is valid':
                        result = true;
                        break;

                    default:
                        result = false;
                        break;
                }
            },
            error: function (xhr, status) {

            },
        });
    } else {
        result = false;
    }

    return result;
}

export {AuthCheck};
