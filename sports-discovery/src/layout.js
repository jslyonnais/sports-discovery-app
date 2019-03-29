import React, { Component } from 'react';

import { Footer } from './components/footer';
import { HeaderNav } from './components/header-nav';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
});

class Layout extends Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <HeaderNav />
                <main className={classes.layout}>{this.props.children}</main>
                <Footer />
            </>
        );
    }
}

export default withStyles(styles)(Layout);
