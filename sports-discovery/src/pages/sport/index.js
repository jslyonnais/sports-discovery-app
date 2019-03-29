import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { sportsData } from './sportsData.js'
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';

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

export class SportPage extends Component {

    render() {

        const { match: { params }, classes } = this.props;
        const sport = sportsData.find(sport=>sport.id === parseInt(params.sportId));

        return (
            <>
                <div className={classes.leftSideSection}>
                    <img className={classes.overlayImage} src={sport.image}/>
                    <div className={classes.overlayContainer}>
                        <h1 className={classes.overlayTitle}>{sport.title}</h1>
                        <div className={classes.overlayDesc}>Based on your the sports you've entered, we've supposed you'll like to play Tennis.Praesent sed placerat nisi.</div>
                    </div>
                </div>
                <div className={classes.rightSideSection}>
                    <div className={classes.controls}>
                        <span className={classes.arrowPrev}>
                            <Icon className={classes.icon}>
                                arrow_back_ios
                            </Icon>
                            Prev
                        </span>
                        <span className={classes.arrowNext}>
                            Next
                            <Icon className={classes.icon}>
                                arrow_forward_ios
                            </Icon>
                        </span>
                    </div>
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
                        <Typography variant="body1" gutterBottom>
                            {sport.description}
                        </Typography>

                        {(sport.gear)?
                        <>
                            <span className={classes.bump}>
                                <Typography 
                                    component="h2"
                                    variant="h5" 
                                    align="center"
                                    className={classes.title}
                                    gutterBottom
                                >
                                    Suggested gear
                                </Typography>
                            </span>
                            <div className={classes.gearList}>
                                {sport.gear.map(x => {
                                    return (
                                        <div key={x.title} className={classes.gear}>
                                            <img className={classes.gearImage} src={x.image} />
                                            <span className={classes.gearTitle}>{x.title}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        : null }

                        <div className={classes.location}>
                            <Icon className={classes.icon}>
                                location_on
                            </Icon>
                            <span className={classes.link}>Discover where to play</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(SportPage);