import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { GMapsAutocomplete } from '../../components/place-autocomplete';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { SportsSelector } from '../../components/sports-selector';
import TextField from '@material-ui/core/TextField';
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
        lineHeight: 1.5,
        marginBottom: 10
    },
    overlayDesc: {
        fontSize: 22,
    },
    rightSideSection: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fabProgress: {
        height:"28px",
        width:"28px",
        position: "absolute",
        margin: "0 10px"
      },
});

class HomePage extends Component {
    state = {
        gender: 'male',
        location: { lat: 0, lng: 0 },
        fullName: '',
        age: 12,
        loading: false,
        likedSports: [],
        dislikedSports: []
    };

    onLocationChange = (suggestion) => {
        const location = { lat: suggestion.geometry.location.lat(), lng: suggestion.geometry.location.lat() };
        this.setState({ location: location });
        localStorage.setItem('location', JSON.stringify(location));
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSportsChange = name => value => {
        this.setState({ [name]: value });
    };

    handleSignUp = () => {
        this.setState({ loading: true });
        
        fetch("https://sportsdiscovery.azurewebsites.net/api/compute?name=hugo&code=G7nO2EgrwhZtHvInE6ajgiQj8ZHSk0PjHRREQy9I39afZexyteqX1g==", {
            method: "POST",
            mode:"no-cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    gender: this.state.gender,
                    location: this.state.location,
                    age: this.state.age,
                    likedsports: this.state.likedSports.map(sport=>sport.value),
                    dislikedsports: this.state.dislikedSports.map(sport=>sport.value)
                }
            ),
        })
        .then(
          (result) => {
            this.setState({
                loading: false
            });
            const sportId = 270;
            this.props.history.push(`/sports/${sportId}`);
          })
    };

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        console.log(this.props)

        return (
            <>
                <div className={classes.leftSideSection}>
                    <img className={classes.overlayImage} src="https://picsum.photos/1920/1080"/>
                    <div className={classes.overlayContainer}>
                        <h1 className={classes.overlayTitle}>Sport for everyone.</h1>
                        <div className={classes.overlayDesc}>Millions of sports. No credit card needed.</div>
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
                        Sign Up to discover new sports
                    </Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                required
                                id="fullName"
                                name="fullName"
                                label="Name"
                                fullWidth
                                autoComplete="fname"
                                value={this.state.fullName}
                                onChange={this.handleChange('fullName')}
                            />
                        </Grid>
                        <Grid item xs={12} lg={2}>
                            <TextField
                                required
                                id="age"
                                name="age"
                                label="Age"
                                value={this.state.age}
                                className={classes.fullWidth}
                                onChange={this.handleChange('age')}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <FormControl
                                component="fieldset"
                                className={classes.fullWidth}
                            >
                                <FormLabel component="legend">Gender</FormLabel>
                                <Select
                                    value={this.state.gender}
                                    onChange={this.handleChange('gender')}
                                    input={<Input name="gender" id="gender" />}
                                >
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={'male'}>Male</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SportsSelector label="Sports you like" onChange={this.handleSportsChange('likedSports')} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SportsSelector label="Sports you dont like" onChange={this.handleSportsChange('dislikedSports')} />
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
                            <Button 
                                variant="contained" 
                                color="primary"
                                className={classes.button}
                                onClick={this.handleSignUp}
                                disabled={loading}
                                >
                                Sign Up
                            </Button>
                            {loading && <CircularProgress size={28} className={classes.fabProgress} />}
                        </Grid>
                    </Grid>
                    </div>
                <div>
                    </div>
                </div>
            </>
            
        );
    }
}

export default withStyles(styles)(HomePage);
