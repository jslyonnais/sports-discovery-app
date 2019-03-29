import React, { Component } from 'react';

import { HeaderNav } from './components/header-nav';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layout: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        fontSize: 18,
        lineHeight: 1.5
    },
    leftSideSection: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#48bbff',
        overflow: 'hidden'
    },
    overlayImage: {
        position: 'absolute',
        opacity: 0.2,
        height: '100%'
    },
    overlayContainer: {
        width: '80%',
        textAlign: 'center',
        zIndex: 1
    },
    overlayTitle: {
        fontSize: 52,
        fontWeight: 700,
        lineHeight: 1.5
    },
    overlayDesc: {

    },
    rightSideSection: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
                
            </>
        );
    }
}

export default withStyles(styles)(Layout);
