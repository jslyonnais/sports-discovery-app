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
    leftSideSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48bbff'
    },
    rightSideSection: {
        flex: 1,
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
                    <div className={classes.leftSideSection}>
                        ...
                    </div>
                    <div className={classes.rightSideSection}>
                        <div>{this.props.children}</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}

export default withStyles(styles)(Layout);
