import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Form from './styles/StyledForm';
import SubmitContainer from './styles/SubmitContainer';
import { withSnackbar } from 'notistack';
import Input from './Input';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    link: {
       textDecoration: 'none',
    }
}));

function SignInForm(props)
{
    const classes = useStyles();

    return (
        <Form>
            <Input
                label="Email или логин"
                type="email"
                name="login"
                autoComplete="email"
                value={props.data.login}
                onChange={props.onChange}
            />
            <Input
                label="Пароль"
                type='password'
                name="password"
                autoComplete="current-password"
                value={props.data.password}
                onChange={props.onChange}
            />
            <SubmitContainer>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.onClick(props.data.login, props.data.password);
                    }}
                >
                    Войти
                </Button>
                <Link
                    to={{
                        pathname: "/forgot",
                        state: { loggedIn: props.loggedIn }
                    }}
                    className={ classes.link }
                >Забыли пароль?</Link>
            </SubmitContainer>
        </Form>
    );
}

export default withSnackbar(SignInForm);
