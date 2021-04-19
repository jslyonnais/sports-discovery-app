import React, { Component } from 'react';

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        opacity: 0.45
    },
    footerText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    heartIcon: {
        margin: theme.spacing.unit * 1
    }
});

class Footer extends Component {
    render() {
        const { classes } = this.props;

        return (
            <>
                <footer className={classes.footer}>
                    <Typography
                        align="center"
                        color="textSecondary"
                        component="p"
                        className={classes.footerText}
                    >
                        Made with{' '}
                        <Icon className={classes.heartIcon}>
                            favorite
                        </Icon>{' '}
                        in Montreal
                    </Typography>
                </footer>
            </>
        );
    }
}

export default withStyles(styles)(Footer);
