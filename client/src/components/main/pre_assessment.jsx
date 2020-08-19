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
  
  class PreAssessment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxSlide: 5,
            dropDownValue: "",
            slide: 1
        }
    };
    
    handleDropDownChange = (event) => {
        this.setState({dropDownValue: event.target.value});
    };

    handleSlideInc = () => {
        if (this.state.slide<this.state.maxSlide){
            this.setState({
                slide: this.state.slide+1
            })
        }
    }

    handleSlideDec = () => {
        if (this.state.slide>1){
            this.setState({
                slide: this.state.slide-1
            })
        }
    }

    
    render() {
        const { classes } = this.props;
        let questions;
        if (this.state.slide === 1){
            questions = (<Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                variant="outlined"
                                fullWidth
                                id="Q2"
                                label="Q2"
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="Q2"
                                label="Q2"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="Q1"
                                label="Q1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                value={this.state.dropDownValue}
                                onChange={this.handleDropDownChange}
                                label="Dropdown"
                                fullWidth
                                >
                                <MenuItem value="">
                                    <em>0</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>)
        }
        else if (this.state.slide === 2){
            questions = (<Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="Q1"
                                label="Q1"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                variant="outlined"
                                fullWidth
                                id="Q3"
                                label="Q3"
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                variant="outlined"
                                fullWidth
                                id="Q3"
                                label="Q3"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                value={this.state.dropDownValue}
                                onChange={this.handleDropDownChange}
                                label="Dropdown"
                                fullWidth
                                >
                                <MenuItem value="">
                                    <em>0</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>)
        }

        return(
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                        <img src={LogoFSC} alt="Logo" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Pre-Assessment Check
                    </Typography>
                    
                    <div className={classes.form} noValidate>
                        {/* <ReactCSSTransitionGroup > */}
                            {questions}
                        {/* </ReactCSSTransitionGroup> */}
                        
                    </div>
                    <ButtonGroup color="primary" fullWidth>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="#8EBC51"
                                className={classes.submit}
                                onClick={this.handleSlideInc}
                                >
                            Back
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="#8EBC51"
                                className={classes.submit}
                                onClick={this.handleSlideDec}
                                >
                            Next
                            </Button>
                        </ButtonGroup>
                </div>
            </Container>
        )
    };
  }

  export default withStyles(useStyles)(PreAssessment)
