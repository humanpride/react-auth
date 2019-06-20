import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';
import $ from 'jquery';
import ForgotPassView from '../ForgotPassView';

function ForgotPass(props)
{
    const [login, setLogin] = useState('');

     const handleChange = event => {
        setLogin(event.target.value);
    };

    const handleClick = login => {
        $.ajax({
            type: 'POST',
            url: '/back-end/controllers/PassRecovery.php',
            data: 'login='+login,
            success: function(response) {
                if (response === 'ok') {
                    props.enqueueSnackbar('Вам отправлено письмо с инструкцией по восстановлению пароля', { variant: 'success' });
                } else if (response === 'user does not exist') {
                    props.enqueueSnackbar('Пользователь с таким логином не найден', { variant: 'error' });
                } else {
                    props.enqueueSnackbar(response, { variant: 'error' });
                }
            },
            error: function(xhr, status) {
                props.enqueueSnackbar('Невозможно подключиться к серверу. Проверьте интернет соединение.', { variant: 'error' });
            },
        });
    };

    return (
        props.loggedIn ?
        <Redirect to={{
            pathname: "/profile",
            state: { loggedIn: props.location.state.loggedIn }
        }}
        />
        :
        <ForgotPassView
            login={login}
            onChange={handleChange}
            onClick={handleClick}
        />
    );
}

export default withSnackbar(ForgotPass);
