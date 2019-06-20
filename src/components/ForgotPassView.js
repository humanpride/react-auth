import React from 'react';
import Button from '@material-ui/core/Button';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import Input from './Input';

function ForgotPass(props)
{
    let {login, onChange, onClick} = props;

    return (
        <Form>
            <h2>Восстановление пароля</h2>
            <Input
                label="Email или логин"
                type="email"
                name="login"
                autoComplete="email"
                value={login}
                onChange={onChange}
            />
            <SubmitContainer>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClick(login)}
                >
                    Отправить
                </Button>
            </SubmitContainer>
        </Form>
    );
}

export default ForgotPass;
