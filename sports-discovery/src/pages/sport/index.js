import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js'

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
