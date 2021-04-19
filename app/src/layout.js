import React, { Component } from 'react';

import { Footer } from './components/footer';
import { HeaderNav } from './components/header-nav';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layout: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh'
    },
    button: {
        display: 'block',
        width: '100%',
        color: '#fff',
        backgroundColor: '#48bbff',
        '&:hover': {
            backgroundColor: '#3399ff'
        }
    }
});

class Layout extends Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <HeaderNav />
                <main className={classes.layout}>
                    {this.props.children}
                </main>
                <Footer />
            </>
        );
    }
}

export default withStyles(styles)(Layout);
