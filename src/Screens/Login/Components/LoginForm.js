import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden,
    InputBase,
    OutlinedInput,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles"
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    AlignBtwn: {
        display: 'flex',
        flexDirection: 'column !important',
        justifyContent: 'center'
    }
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: "10px",
        marginTop: "5px",
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const LoginForm = () => {
    const classes = useStyles();
    return (
        <Grid container mt={8} >
            <Grid xs={12} >
                <Box my={1} mx={2} style={{ width: "auto" }}>
                    <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                        Email
                    </Typography>
                    <OutlinedInput
                        fullwidth
                        // className={classes.productInput}
                        style={{ width: "100%" }}
                        type="text"
                        placeholder='user@gmail.com'
                    />
                </Box>
            </Grid>
            <Grid xs={12} >
                <Box my={1} mx={2} style={{ width: "auto" }}>
                    <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                        Password
                    </Typography>
                    <OutlinedInput
                        fullwidth
                        // className={classes.productInput}
                        style={{ width: "100%" }}
                        type="password"
                        placeholder='Password'
                    />
                </Box>
            </Grid>
            <Grid item xs={12} >
            <Box className={classes.AlignBtwn} m={2} >
                <Button variant="contained" style={{margin:'5px 0px'}} >
                    Login
                </Button>
                <Typography style={{textAlign:'center',marginTop:'5px'}} >
                    <Link to='/signup' >
                        Don't Have an Account? Signup
                    </Link>
                </Typography>
            </Box>
            </Grid>
        </Grid>
    )
}

export default LoginForm