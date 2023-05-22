import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden
} from "@mui/material";
import { makeStyles } from "@mui/styles"
// import { styled } from '@mui/system';
// import Banner from "../../Assets/Images/SignupBanner.png"
import SignupForm from './Components/SignupForm';
// import bg from "../../Assets/Images/wave.png"
import GraphicSide from "../../Assets/Images/loginSide.jpeg"
import { Navigate } from "react-router-dom"
import logo from '../../Assets/Images/Logo.png'

const useStyles = makeStyles((theme) => ({
    mainHead: {
        color: '#000000 !important',
        fontWeight: 'bold !important',
        textTransform: 'uppercase !important',
        textAlign: 'center',
        width: '100%',
        lineHeight: '40px !important',
        fontSize: '2.5rem !important',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '50px !important',
            fontSize: '2.4rem !important',
        },
        [theme.breakpoints.down("ms")]: {
            lineHeight: '40px !important',
            fontSize: '2rem !important',
        }
    },
    mainHead1: {
        color: '#A9A9A9', 
        textAlign: 'center',
        width: '100%',
        lineHeight: '25px !important',
        fontSize: '1rem !important',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '50px !important',
            fontSize: '1rem !important',
        },
        
        [theme.breakpoints.down("ms")]: {
            lineHeight: '40px !important',
            fontSize: '1rem !important',
        }
    },
    bannerImg: {
        width: '100%',
        height: 'auto'
    },
    ContainerBorder: {
        // border:'3px solid #3D84E5',
        borderRadius: "10px",
        padding: '20px',
        height: 'auto'
        // boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    },
    // backImg:
    // {
    //     width: '100%',
    //     minHeight: '100vh !important',
    //     // backgroundImage: `url(${bg})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    // },
    sideBanner: {
        [theme.breakpoints.down('nineS')]: {
            display: 'none',
            
        },
        transform: 'rotate(180deg)',
        maxHeight: '100vh'
    },
    graphicSide: {
        width: '100%',
        height: '100vh',
        paddingLeft: theme.spacing(1),
    },
    
}));

const Signup = () => {
    const classes = useStyles();

    if (localStorage.getItem('token')) {
        return <Navigate to={-1} />
    }
    
    return (
        <Grid container >
            <Grid item xs={0} nineS={6} className={classes.sideBanner} >
                <img src={GraphicSide} alt="GraphicSide Banner" className={classes.graphicSide} />
            </Grid>
            <Grid item xs={12} nineS={6} className={classes.sideForm} style={{marginBottom:'10% !important'}} >
            <Typography className={classes.mainHead}  ><img src={logo} className={classes.logoImage}  /></Typography>
                <Typography className={classes.mainHead}  >Sign Up</Typography>
                <Typography className={classes.mainHead1}  >Create your working days account.</Typography>
                <SignupForm/>
            </Grid>
        </Grid>
    )
}

export default Signup

// start work 

