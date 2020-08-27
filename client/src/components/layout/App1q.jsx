import React from "react";
import { Container, ButtonGroup, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LogoFSC from '../common/logo_fsc.png'

const useStyles = theme => ({
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        boxShadow: "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)"
        
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });


class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxSlide: 5,
            dropDownValue: "",
            slide: 1
        }
    };

    render (){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h5" className={classes.center}>
                        {this.props.q}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Question)