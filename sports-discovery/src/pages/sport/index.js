import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js'

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

export class SportPage extends Component {

    render() {
        const { match: { params } } = this.props;
        const sport = sportsData.find(sport=>sport.id === parseInt(params.sportId));

        return (
            <>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {sport.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {sport.Description}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                Requiered gear
                </Typography>
            </>
        );
    }
}

export default SportPage;
