import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
    {
        Name: 'Golf',
        Id: 270
    },
    {
        Name: 'Ice hockey',
        Id: 175
    },
    {
        Name: 'Soccer',
        Id: 81
    },
    {
        Name: 'Baseball',
        Id: 74
    },
    {
        Name: 'Volleyball',
        Id: 93
    },
    {
        Name: 'Basketball',
        Id: 78
    },
    {
        Name: 'Downhill skiing',
        Id: 67
    },
    {
        Name: 'Cycling',
        Id: 258
    },
    {
        Name: 'Swimming',
        Id: 224
    },
    {
        Name: 'Badminton',
        Id: 132
    },
    {
        Name: 'Tennis',
        Id: 134
    },
    {
        Name: 'Curling',
        Id: 999
    },
    {
        Name: 'Softball',
        Id: 347
    },
    {
        Name: 'Football',
        Id: 87
    },
    {
        Name: 'Ball hockey',
        Id: 368
    },
    {
        Name: 'Bowling',
        Id: 858
    },
    {
        Name: 'Martial arts',
        Id: 593
    },
    {
        Name: 'Squash',
        Id: 141
    },
    {
        Name: 'Kayaking',
        Id: 996
    },
    {
        Name: 'Equestrian mounted games',
        Id: 412
    },
    {
        Name: 'Rugby',
        Id: 89
    },
    {
        Name: 'Olympic weightlifting',
        Id: 710
    },
    {
        Name: 'Cross country running',
        Id: 339
    }
].map(suggestion => ({
    value: suggestion.Id,
    label: suggestion.Name
}));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    input: {
        display: 'flex',
        padding: 0
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class SportsSelector extends React.Component {
    state = {
        single: null,
        multi: null
    };

    handleChange = name => value => {
        this.setState({
            [name]: value
        });
    };

    render() {
        const { classes, theme, label } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit'
                }
            })
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <div className={classes.divider} />
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={{
                            label: label,
                            InputLabelProps: {
                                shrink: true
                            }
                        }}
                        options={suggestions}
                        components={components}
                        value={this.state.multi}
                        onChange={this.handleChange('multi')}
                        placeholder="Select multiple sports"
                        isMulti
                    />
                </NoSsr>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SportsSelector);
