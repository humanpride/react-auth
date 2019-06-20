import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Profile from './components/logic/Profile';
import { SnackbarProvider } from 'notistack';
import { Redirect, Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './components/logic/AuthRouter';
import { AuthCheck } from './components/logic/AuthCheck';
import ForgotPass from './components/logic/ForgotPass';

function App(props)
{
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loggedIn) {
        if (AuthCheck()) {
            setLoggedIn(true);
        }
    }

    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <Container maxWidth="sm">
                    <Switch>
                        <Route exact path="/" render={() => (
                            loggedIn ? (
                                <Redirect to={{
                                    pathname: "/profile",
                                    state: {loggedIn: loggedIn}
                                }} />
                            ) : (
                                <Redirect to={{
                                    pathname: "/login",
                                    state: {loggedIn: loggedIn}
                                }} />
                            )
                        )} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/login" component={AuthRouter} />
                        <Route path="/forgot" component={ForgotPass} />
                    </Switch>
                </Container>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
