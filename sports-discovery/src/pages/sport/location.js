import React, { Component } from 'react';

import { sportsData } from './sportsData.js'
import GoogleMapReact from 'google-map-react';
import Icon from '@material-ui/core/Icon';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 14,
        textAlign: 'center'
    },
    title: {
        display: 'block',
        color: '#4f4f4f',
        fontWeight: 700,
        marginBottom: theme.spacing.unit * 6
    },
    sub: {
        display: 'block',
        fontSize: 18,
        color: '#bbb'
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
        textAlign: 'left',
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
    locationList: {

    },
    location: {
        textAlign: 'left',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: theme.spacing.unit*2,
        paddingTop: theme.spacing.unit *2,
        display: 'flex',
        '&:last-child': {
            border: 0
        }
    },
    locationTitle: {
        display: 'block',
        fontSize: 20,
        fontWeight: 700,
        marginBottom: theme.spacing.unit
    },
    locationAddress: {

    },
    locationContainer: {
        marginLeft: theme.spacing.unit
    },
    locationLink: {
        display: 'block',
        color: '#48bbff',
        textDecoration: 'underline',
        fontWeight: 700,
        cursor: 'pointer',
    }
});

export class SportLocationPage extends Component {
    constructor(props) {
        super(props);

        this.state = { places: [] }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const location = JSON.parse(localStorage.getItem('location'));
        const self = this;

        fetch(`https://sportplaces.api.decathlon.com/api/v1/places?origin=${location.lng},${location.lat}&radius=99&sports=${params.sportId}`)
            .then(response => response.json())
            .then(result => { self.setState({ places: result.data.features }) });
    }

    render() {
        const { match: { params }, classes } = this.props;
        const sport = sportsData.find(sport=>sport.id === parseInt(params.sportId));
        const location = JSON.parse(localStorage.getItem('location'));

        const locationMarker = <LocationIcon fontSize="large" color="primary" lat={location.lat} lng={location.lng} text="You are here" />
        const placeMarkers = this.state.places.map(place => {
            const { name, uuid } = place.properties;
            const coords = place.geometry.coordinates;
            return <LocationIcon key={uuid} fontSize="large" color="secondary" lat={coords[1]} lng={coords[0]} text={name} />
        });
        
        return (
            <>
                <div className={classes.leftSideSection}>
                    <div style={{ height: '100vh', width: '100%', position: 'absolute', top: 0 }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyADZ6SKjElEyIdZ7og8PzLEBZ6zLOAtPz8" }}
                            defaultCenter={location}
                            defaultZoom={11}
                        >
                            {placeMarkers}
                            {locationMarker}
                        </GoogleMapReact>
                    </div>
                </div>
                <div className={classes.rightSideSection}>
                    <div className={classes.paper}>
                        <Typography 
                            component="h2"
                            variant="h4" 
                            align="left"
                            className={classes.title}
                            gutterBottom
                        >
                            <span className={classes.sub}>Location near</span> Montreal, QC, Canada
                        </Typography>


                        <div className={classes.locationList}>
                            <div className={classes.location}>
                                <Icon className={classes.icon}>
                                    location_on
                                </Icon>
                                <div className={classes.locationContainer}>
                                    <span className={classes.locationTitle}>Lorem Ipsum</span>
                                    <span className={classes.locationAddress}>1700 Saint-Patrick St, Montreal, QC H3K 1A7</span>
                                    <span className={classes.locationLink}>Get directions</span>
                                </div>
                            </div>
                            <div className={classes.location}>
                                <Icon className={classes.icon}>
                                    location_on
                                </Icon>
                                <div className={classes.locationContainer}>
                                    <span className={classes.locationTitle}>Lorem Ipsum</span>
                                    <span className={classes.locationAddress}>1700 Saint-Patrick St, Montreal, QC H3K 1A7</span>
                                    <span className={classes.locationLink}>Get directions</span>
                                </div>
                            </div>
                            <div className={classes.location}>
                                <Icon className={classes.icon}>
                                    location_on
                                </Icon>
                                <div className={classes.locationContainer}>
                                    <span className={classes.locationTitle}>Lorem Ipsum</span>
                                    <span className={classes.locationAddress}>1700 Saint-Patrick St, Montreal, QC H3K 1A7</span>
                                    <span className={classes.locationLink}>Get directions</span>
                                </div>
                            </div>
                            <div className={classes.location}>
                                <Icon className={classes.icon}>
                                    location_on
                                </Icon>
                                <div className={classes.locationContainer}>
                                    <span className={classes.locationTitle}>Lorem Ipsum</span>
                                    <span className={classes.locationAddress}>1700 Saint-Patrick St, Montreal, QC H3K 1A7</span>
                                    <span className={classes.locationLink}>Get directions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(SportLocationPage);