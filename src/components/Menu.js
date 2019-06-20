import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    authMenu: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    link: {
        width: '50%',
        height: '64px',
        lineHeight: '64px',
        textAlign: 'center',
    },
    Active: {
        backgroundColor: '#f9f9f9',
        cursor: 'default',
    },
}));

function Menu(props) {
    const classes = useStyles();
    
    return (
        <Router>
            <div className={classes.authMenu}>
                <Link
                    component={RouterLink}
                    to="/"
                    onClick={props.signIn}
                    className={clsx(classes.link, props.active === 'signIn' ? classes.Active : '')}
                    underline='none'
                >
                    Вход
                </Link>
                <Link
                    component={RouterLink}
                    to="/"
                    onClick={props.signUp}
                    className={clsx(classes.link, props.active === 'signUp' ? classes.Active : '')}
                    underline='none'
                >
                    Регистрация
                </Link>
            </div>
        </Router>
    );
}

export default Menu;
