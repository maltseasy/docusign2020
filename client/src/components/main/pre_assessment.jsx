import React from "react";
import { Container, ButtonGroup, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LogoFSC from '../common/logo_fsc.png'

const useStyles = makeStyles((theme) => ({
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
  }));
  
  export default function PreAssessment() {
    const classes = useStyles();
    const [dropDownValue, setdropDownValue] = React.useState('');
  
    const handleChange = (event) => {
      setdropDownValue(event.target.value);
    };
  
    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                {/* <LockOutlinedIcon /> */}
                <img src={LogoFSC} alt="Logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
                Pre-Assessment Check
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
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
                        value={dropDownValue}
                        onChange={handleChange}
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
                </Grid>
                <ButtonGroup color="primary" fullWidth>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                    Next
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                    Next
                    </Button>
                </ButtonGroup>
                
            </form>
        </div>
        </Container>
    );
  }