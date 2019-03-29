import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3
        }
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

export class SportPage extends Component {

    render() {

        const { match: { params }, classes } = this.props;
        const sport = sportsData.find(sport=>sport.id === parseInt(params.sportId));

        return (
            <>
                <div className={classes.leftSideSection}>
                    ...
                </div>
                <div className={classes.rightSideSection}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {sport.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    {sport.Description}
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                    Requiered gear
                    </Typography>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(SportPage);