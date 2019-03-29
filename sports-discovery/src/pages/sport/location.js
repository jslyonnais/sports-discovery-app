import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 14
    },
    title: {
        display: 'block',
        color: '#4f4f4f',
        fontWeight: 700,
        marginBottom: theme.spacing.unit * 6
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
        lineHeight: 1.5,
        textTransform: 'capitalize'
    },
    overlayDesc: {

    },
    rightSideSection: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gearList: {
        display: 'flex', 
        justifyContent: 'space-between'
    },
    gear: {
        width: '30%',
        textAlign: 'center'
    },
    gearImage: {
        width: '100%',
        display: 'block',
        border: '1px solid #e0e0e0',
        marginBottom: theme.spacing.unit
    },
    gearTitle: {
        fontSize: 12,
        color: '#BBB'
    },
    link: {
        color: '#48bbff',
        textDecoration: 'underline',
        fontWeight: 700,
        display: 'inline-block',
        marginLeft: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        borderLeft: '1px solid #e0e0e0',
        cursor: 'pointer',
        lineHeight: 1
    },
    location: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 4
    },
    icon: {
        color: '#e0e0e0'
    },
    bump: {
        display: 'block',
        marginTop: theme.spacing.unit * 3
    },
    controls: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#e0e0e0'
    },
    arrowPrev: {
        marginLeft: theme.spacing.unit,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center'
    },
    arrowNext: {
        marginRight: theme.spacing.unit,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center'
    },
});

export class SportLocationPage extends Component {
    render() {
        const { match: { params }, classes } = this.props;
        const sport = sportsData.find(sport=>sport.id === parseInt(params.sportId));
        const location = JSON.parse(localStorage.getItem('location'));
        console.log("Location:");
        console.log(location);
        console.log(sport);
        // https://sportplaces.api.decathlon.com/api/v1/places?origin=-73.582,45.511&radius=99&sports=175
        fetch(`https://sportplaces.api.decathlon.com/api/v1/places?origin=${location.lng},${location.lat}&radius=99&sports=${sport.id}`)
        .then(response => response.json())
        .then(result => console.log(result))

        return (
            <>
                <div className={classes.leftSideSection}>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyADZ6SKjElEyIdZ7og8PzLEBZ6zLOAtPz8" }}
                            defaultCenter={location}
                            defaultZoom={8}
                        >
                            <LocationIcon
                                fontSize="large"
                                color="secondary"
                                lat={location.lat}
                                lng={location.lng}
                                text="You are here"
                            />
                        </GoogleMapReact>
                    </div>
                </div>
                <div className={classes.rightSideSection}>
                    <div className={classes.paper}>
                        <Typography 
                            component="h2"
                            variant="h3" 
                            align="center"
                            className={classes.title}
                            gutterBottom
                        >
                            Try {sport.title}
                        </Typography>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(SportLocationPage);