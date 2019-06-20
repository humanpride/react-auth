import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { withSnackbar } from 'notistack';
import SignUpForm from '../SignUpForm';
import SignInForm from '../SignInForm';
import { auth } from './Authentication';
import { validateEmail, validatePass, confirmPass } from './Validate';
import { Registration } from './Registration';

function Form(props)
{
    const [loggedIn, setLoggedIn] = useState(props.loggedIn);

    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
        showPassword: false,
    });

    const handleChangeLogin = event => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value});
    };

    const handleAuth = (login, password) => {
        if (!auth(login, password)) {
            props.enqueueSnackbar('Неверный логин или пароль', { variant: 'error'});
        } else {
            setLoggedIn(true);
        }
    };

    const [regData, setRegData] = useState({
        email: '',
        password: '',
        confirm: '',
        validEmail: true,
        emailErrorMsg: '',
        validPassword: true,
        passConfirmed: false,
    });

    const handleChangeReg = event => {
        let isValid = regData.validEmail;
        let errorMsg = '';
        let validResponse = null;
        switch (event.target.name) {
            case 'email':
                validResponse = validateEmail(event.target.value);
                console.log(validResponse);
                switch (validResponse) {
                    case 1:
                        isValid = true;
                        break;
                    case 0:
                        isValid = false;
                        errorMsg = 'Введите корректный Email';
                        break;
                    case -1:
                        isValid = false;
                        errorMsg = 'Пользователь с таким Email уже зарегистрирован';
                        break;

                    default:
                        isValid = false;
                        errorMsg = validResponse;
                        break;
                }
                setRegData({
                    ...regData,
                    email: event.target.value,
                    validEmail: isValid,
                    emailErrorMsg: errorMsg,
                });
                break;
            
            case 'password':
                setRegData({
                    ...regData,
                    password: event.target.value,
                    validPassword: validatePass(event.target.value),
                });
                break;

            case 'confirm':
                setRegData({
                    ...regData,
                    confirm: event.target.value,
                    passConfirmed: confirmPass(regData.password, event.target.value),
                });
                break;

            default:
                break;
        }
    };

    const handleReg = () => {
        const email = regData.email;
        const password = regData.password;

        const regResponse = Registration(email, password);
        switch (regResponse) {
            case 'error':
                props.enqueueSnackbar('Ошибка отправки запроса на сервер. Проверьте ваше интернет соединение.');
                break;
        
            case 'дубль':
                props.enqueueSnackbar('Пользователь с таким Email уже зарегистрирован', { variant: 'error' });
                break;

            default:
                setRegData({
                    email: '',
                    password: '',
                    confirm: '',
                    showPassword: false,
                    validEmail: true,
                    validPassword: true,
                    passConfirmed: false,
                });
                props.enqueueSnackbar(regResponse, { variant: 'success' });
                break;
        }
    };

    return (
        loggedIn ? <Redirect to={{
            pathname: "/profile",
            state: {loggedIn: loggedIn}
        }} />
        :
        props.type === 'signIn' ?
            <SignInForm
                data={loginData}
                onChange={handleChangeLogin}
                onClick={(login, pass) => {
                    handleAuth(login, pass);
                }}
            />
        :
            <SignUpForm
                data={regData}
                onChange={handleChangeReg}
                onClick={handleReg}
            />
    );
}

export default withSnackbar(Form);
