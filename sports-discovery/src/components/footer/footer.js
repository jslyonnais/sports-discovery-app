import React, { Component } from 'react';

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    footer: {
        padding: theme.spacing.unit * 6
    },
    footerText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
                    <Typography variant="h6" align="center" gutterBottom>
                        Sports Discovery
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                        component="p"
                        className={classes.footerText}
                    >
                        Built with{' '}
                        <Icon color="error" className={classes.heartIcon}>
                            favorite
                        </Icon>{' '}
                        by the GSOFT team.
                    </Typography>
                </footer>
            </>
        );
    }
}

export default withStyles(styles)(Footer);
