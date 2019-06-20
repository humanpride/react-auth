import React from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import Input from './Input';

function SignUpForm(props)
{
    let {data, onChange, onClick} = props;
    return (
        <Form>
            <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={onChange}
                error={data.validEmail ? false : true}
                helperMsg={data.emailErrorMsg}
            />
                 
            <Input
                label="Пароль"
                type='password'
                name="password"
                autoComplete="current-password"
                value={data.password}
                onChange={onChange}
                error={data.validPassword || data.password === '' ? false : true}
                helperMsg={data.validPassword || data.password === '' ? '' : 'Пароль должен быть не менее 8 символов'}
            />
            
            <Input
                label="Повторите пароль"
                type='password'
                name="confirm"
                value={data.confirm}
                onChange={onChange}
                error={data.passConfirmed || data.confirm === '' ? false : true}
                helperMsg={data.passConfirmed || data.confirm === '' ? '' : 'Пароли должны совпадать'}
            />

            <SubmitContainer>
                <Button
                    disabled={data.validEmail && data.validPassword && data.passConfirmed ? false : true}
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                >
                    Регистрация
                </Button>
            </SubmitContainer>
        </Form>
    );
}

export default withSnackbar(SignUpForm);
