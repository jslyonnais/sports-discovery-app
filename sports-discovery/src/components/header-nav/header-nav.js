import React, { Component } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
<<<<<<< HEAD
    header: {
        position: 'fixed',
        top: theme.spacing.unit * 2,
        left: theme.spacing.unit * 2,
        zIndex: 9
    },
    logo: {
        width: 140
=======
    appBar: {
        position: 'absolute'
    },
    toolBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
>>>>>>> 3ff972dedd80109f69144588d2c98c0fd46f21bd
    }
});

class HeaderNav extends Component {
    render() {
        const { classes } = this.props;

        return (
            <>
<<<<<<< HEAD
                <div className={classes.header}>
                    <RouterLink to="/">
                        <img 
                            className={classes.logo} 
                            src={" data:image/png;base64,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"} 
                        />
                    </RouterLink>
                </div>
=======
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    className={classes.appBar}
                >
                    <Toolbar classes={{ root: classes.toolBar }}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Sportify
                        </Typography>
                        <div>
                            <Button component={RouterLink} to="/">
                                Home
                            </Button>
                            <Button component={RouterLink} to="/about">
                                About
                            </Button>
                            <Button color="primary" variant="outlined">
                                Login
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
>>>>>>> 3ff972dedd80109f69144588d2c98c0fd46f21bd
            </>
        );
    }
}

export default withStyles(styles)(HeaderNav);