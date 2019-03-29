import React, { Component } from 'react';

import { GMapsAutocomplete } from '../../components/place-autocomplete';
import { SportsSelector } from '../../components/sports-selector';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    button: {
        display: 'block',
        width: '100%',
        color: '#fff',
        backgroundColor: '#48bbff'
    }
});

class HomePage extends Component {
    state = {
        gender: '',
        location: { lat: 0, lng: 0 },
        fullName: '',
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
            <div>
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
                                    <MenuItem value={'other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SportsSelector label="Sports you like" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SportsSelector label="Sports you dont like" />
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
                                className={classes.button}>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);
