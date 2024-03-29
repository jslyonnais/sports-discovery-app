import React, { Component } from 'react';
import {
    SelectValidator,
    TextValidator,
    ValidatorForm
} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { GMapsAutocomplete } from '../../components/place-autocomplete';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { SportsSelector } from '../../components/sports-selector';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 10
    },
    title: {
        display: 'block',
        color: '#4f4f4f',
        fontWeight: 700,
        marginBottom: theme.spacing.unit * 6
    },
    powered: {
        display: 'block',
        color: '#ccc',
        fontWeight: 700,
        fontStyle: 'italic',
        marginTop: theme.spacing.unit
    },
    fullWidth: {
        width: '100%'
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
        fontSize: 62,
        fontWeight: 700,
        lineHeight: 1,
        marginBottom: 10
    },
    overlayDesc: {
        fontSize: 20,
        lineHeight: 1.25
    },
    rightSideSection: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        backgroundColor: '#48BBFF',
        '&:hover': {
            backgroundColor: '#3399FF'
        }
    },
    fabProgress: {
        height: '28px',
        width: '28px',
        position: 'absolute',
        margin: '0 10px'
    }
});

class HomePage extends Component {
    state = {
        gender: '',
        location: { lat: 0, lng: 0 },
        fullName: '',
        age: null,
        loading: false,
        likedSports: [],
        dislikedSports: []
    };

    onLocationChange = suggestion => {
        const location = {
            lat: suggestion.geometry.location.lat(),
            lng: suggestion.geometry.location.lng()
        };
        this.setState({ location: location });

        localStorage.setItem('locationId', suggestion.place_id);
        localStorage.setItem('location', JSON.stringify(location));
        localStorage.setItem('locationName', suggestion.formatted_address);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSportsChange = name => value => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        this.setState({ loading: true });
        const discoveryUrl = process.env.REACT_APP_DISCOVERY_URL

        fetch(
            `${discoveryUrl}/Compute?code=1jBYduutNJHG/wafTLX7J9H7Hx3etlVVlAY4BpuT21ESw1btCwkkGg==`,
            {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gender: this.state.gender,
                    location: this.state.location,
                    age: this.state.age,
                    likedsports: this.state.likedSports.map(
                        sport => sport.value
                    )
                })
            }
        )
            .then(result => result.json())
            .then(result => {
                this.setState({
                    loading: false
                });
                const sportId = result;
                this.props.history.push(`/sports/${sportId}`);
            });
    };

    render() {
        const { classes } = this.props;
        const { loading } = this.state;

        return (
            <>
                <div className={classes.leftSideSection}>
                    <img
                        className={classes.overlayImage}
                        src="./home-photo-1.jpg"
                        alt="sporty"
                    />
                    <div className={classes.overlayContainer}>
                        <h1 className={classes.overlayTitle}>
                            Wanna be sporty?
                        </h1>
                        <div className={classes.overlayDesc}>
                            Tired of always doing the same sport, or simply want
                            to try a new one? Lets Sportify's AI suggest you new
                            sports that you should try based on your current
                            sport preferences.
                        </div>
                    </div>
                </div>
                <div className={classes.rightSideSection}>
                    <div className={classes.paper}>
                        <Typography
                            component="h2"
                            variant="h5"
                            align="center"
                            className={classes.title}
                        >
                            Discover a new sports
                        </Typography>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Grid container spacing={24}>
                                <Grid item xs={12} lg={6}>
                                    <FormLabel component="legend">
                                        Age *
                                    </FormLabel>
                                    <TextValidator
                                        id="age"
                                        name="age"
                                        validators={[
                                            'required',
                                            'minNumber:1',
                                            'maxNumber:120'
                                        ]}
                                        errorMessages={[
                                            'this field is required',
                                            'must be greater than 0',
                                            'must be smaller than 121'
                                        ]}
                                        value={this.state.age}
                                        className={classes.fullWidth}
                                        onChange={this.handleChange('age')}
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControl
                                        component="fieldset"
                                        className={classes.fullWidth}
                                    >
                                        <FormLabel component="legend">
                                            Gender *
                                        </FormLabel>
                                        <SelectValidator
                                            value={this.state.gender}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                            onChange={this.handleChange(
                                                'gender'
                                            )}
                                            input={
                                                <Input
                                                    name="gender"
                                                    id="gender"
                                                />
                                            }
                                        >
                                            <MenuItem value={'female'}>
                                                Female
                                            </MenuItem>
                                            <MenuItem value={'male'}>
                                                Male
                                            </MenuItem>
                                        </SelectValidator>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <SportsSelector
                                        label="Sports you like"
                                        onChange={this.handleSportsChange(
                                            'likedSports'
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="location">
                                        Location *
                                    </InputLabel>
                                    <GMapsAutocomplete
                                        id="location"
                                        name="location"
                                        placeholder=""
                                        onSuggestionSelected={
                                            this.onLocationChange
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Discover
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size={28}
                                            className={classes.fabProgress}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h8"
                                        align="right"
                                        className={classes.powered}
                                    >
                                        Powered by AI
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                    <div />
                </div>
            </>
        );
    }
}

export default withStyles(styles)(HomePage);
