import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js';
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
    overlayDesc: {},
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
    locationList: {},
    locationItem: {
        textAlign: 'left',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
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
    locationAddress: {},
    locationContainer: {
        marginLeft: theme.spacing.unit
    },
    locationLink: {
        display: 'block',
        color: '#48bbff',
        textDecoration: 'underline',
        fontWeight: 700,
        cursor: 'pointer'
    },
    link: {
        color: '#48bbff',
        textDecoration: 'underline',
        fontWeight: 700,
        display: 'inline-block',
        marginLeft: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        cursor: 'pointer',
        lineHeight: 1
    }
});

export class SportLocationPage extends Component {
    constructor(props) {
        super(props);

        this.state = { places: [] };
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        const location = JSON.parse(localStorage.getItem('location'));
        const self = this;

        fetch(
            `https://sportplaces.api.decathlon.com/api/v1/places?origin=${
                location.lng
            },${location.lat}&radius=99&sports=${params.sportId}`
        )
            .then(response => response.json())
            .then(result => {
                self.setState({ places: result.data.features });
            });
    }

    render() {
        const {
            match: { params },
            classes
        } = this.props;
        const location = JSON.parse(localStorage.getItem('location'));
        const locationId = localStorage.getItem('locationId');
        const locationName = localStorage.getItem('locationName');

        const locationMarker = (
            <LocationIcon
                fontSize="large"
                color="primary"
                lat={location.lat}
                lng={location.lng}
                text="You are here"
            />
        );
        const placeMarkers = this.state.places.map(place => {
            const { name, uuid } = place.properties;
            const coords = place.geometry.coordinates;
            return (
                <LocationIcon
                    key={uuid}
                    fontSize="large"
                    color="secondary"
                    lat={coords[1]}
                    lng={coords[0]}
                    text={name}
                />
            );
        });

        const placeDescriptions = this.state.places.map((place, i) => {
            const {
                name,
                address_components,
                google_place_id
            } = place.properties;

            return (
                <div key={i} className={classes.locationItem}>
                    <Icon className={classes.icon}>location_on</Icon>
                    <div className={classes.locationContainer}>
                        <span className={classes.locationTitle}>{name}</span>
                        <span className={classes.locationAddress}>
                            {address_components.address},{' '}
                            {address_components.city},{' '}
                            {address_components.province},{' '}
                            {address_components.country}
                        </span>
                        <span className={classes.locationLink}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.google.com/maps/dir/?api=1&origin=${locationName}&origin_place_id=${locationId}&destination=${name}&destination_place_id=${google_place_id}`}
                            >
                                Get directions
                            </a>
                        </span>
                    </div>
                </div>
            );
        });

        const sport = sportsData.find(
            sport => sport.id === parseInt(params.sportId)
        );

        return (
            <>
                <div className={classes.leftSideSection}>
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            top: 0
                        }}
                    >
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: process.env.REACT_APP_GOOGLE_KEY
                            }}
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
                            align="center"
                            className={classes.title}
                            gutterBottom
                        >
                            <span className={classes.sub}>Location near</span>{' '}
                            {locationName}
                        </Typography>

                        <div className={classes.locationList}>
                            {placeDescriptions}
                        </div>
                        <Link
                            className={classes.link}
                            to={`/sports/${params.sportId}`}
                        >
                            Back to {sport.title}
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(SportLocationPage);
