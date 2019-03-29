import React, { Component } from 'react';

import { Footer } from '../../components/footer';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { GMapsAutocomplete } from '../../components/place-autocomplete';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { SportsSelector } from '../../components/sports-selector';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

class HomePage extends Component {
    state = {
        gender: 'female',
        location: { lat: 0, lng: 0 },
        firstName: '',
        lastName: '',
        age: 12
    };

    onLocationChange = (suggestion, suggestionValue) => {
        this.setState({ location: { lat: 42.5465497, lng: -83.027849 } });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
        <>
            <div className={classes.leftSideSection}>
            <img className={classes.overlayImage} src="https://picsum.photos/1920/1080"/>
            <div className={classes.overlayContainer}>
                <h1 className={classes.overlayTitle}>Title Ipsum</h1>
                <div className={classes.overlayDesc}>Based on your the sports you've entered, we've supposed you'll like to play Tennis.Praesent sed placerat nisi.</div>
            </div>

            <Footer />
            </div>
        <div className={classes.rightSideSection}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Profile
                    </Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="fname"
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="lname"
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="age"
                                name="age"
                                label="Age"
                                value={this.state.age}
                                onChange={this.handleChange('age')}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender"
                                    className={classes.group}
                                    value={this.state.gender}
                                    onChange={this.handleChange('gender')}
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="location">
                                Location *
                            </InputLabel>
                            <GMapsAutocomplete
                                id="location"
                                name="location"
                                placeholder=""
                                onSuggestionSelected={this.onLocationChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SportsSelector label="Sports you like" />
                        </Grid>
                        <Grid item xs={12}>
                            <SportsSelector label="Sports you dont like" />
                        </Grid>
                    </Grid>
                </div>
            </div>
            </>
        );
    }
}

export default withStyles(styles)(HomePage);
