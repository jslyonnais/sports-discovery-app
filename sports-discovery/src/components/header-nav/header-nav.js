import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './header-nav.module.css';

class HeaderNav extends Component {
    render() {
        return (
            <>
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    className={styles.appBar}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={styles.toolbarTitle}
                        >
                            Sports Discovery
                        </Typography>
                        <Button component={RouterLink} to="/">
                            Home
                        </Button>
                        <Button component={RouterLink} to="/about">
                            About
                        </Button>
                        <Button color="primary" variant="outlined">
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

export default HeaderNav;
