import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden
} from "@mui/material";
import { makeStyles } from "@mui/styles"
import SignupForm from './Components/SignupForm';
import { Navigate } from "react-router-dom"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import signupside from '../../Assets/Images/signupside.jpeg'
import logo from '../../Assets/Images/Logo.png'

const useStyles = makeStyles((theme) => ({
    mainHead: {
        color: '#000000',
        fontWeight: 'bold !important',
        textTransform: 'uppercase !important',
        textAlign: 'center',
        width: '100%',
        lineHeight: '60px !important',
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
        lineHeight: '30px !important',
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
    signupsideImg: {
        width: '100%',
        height: '100vh',
        [theme.breakpoints.down("1090")]: {
            display:'none',
            overflow:'hidden'
        }

    },
    ContainerBorder: {
        height: 'auto'
        
    },
    alignCnter: {
        display: 'flex',
        flexDirection: 'column !important',
        justifyContent: 'center',
        alignItems: 'baseline',
        [theme.breakpoints.down("md")]: {
            alignItems: 'center',
            marginTop: '7% !important', 
            margin:'7% 26% 3% 25% !important'     
        },
        [theme.breakpoints.down("900")]: {
            alignItems: 'center',
            marginTop: '7% !important', 
            margin:'7% 23% 3% 23% !important'
            
        },
        [theme.breakpoints.down("800")]: {
            alignItems: 'center',
            marginTop: '8% !important', 
            margin:'7% 23% 3% 23% !important'
            
        },
        [theme.breakpoints.down("700")]: {
            alignItems: 'center',
            marginTop: '8% !important', 
            margin:'7% 20% 3% 20% !important'
            
        },
        [theme.breakpoints.down("sm")]: {   
            alignItems: 'center',
            marginTop: '10% !important',
            margin:'15% 4% 3% 4.5% !important'
        }
    }
}));

const Signup = () => {
    const classes = useStyles();

    if (localStorage.getItem('token')) {
        return <Navigate to={-1} />
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,

        color: theme.palette.text.secondary,
    }));
    return (
        <>     
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }} className={classes.ContainerBorder}>
                <Grid item xs={12} md={6}  >
                    <Item><img src={signupside} className={classes.signupsideImg}></img></Item>
                </Grid>
                <Grid item xs={12} md={6} className={classes.alignCnter}  >

                    <Typography className={classes.mainHead}  ><img src={logo} /></Typography>
                    <Typography className={classes.mainHead}  >Sign Up</Typography>
                    <Typography className={classes.mainHead1}  >Create your working days account.</Typography>
                    <SignupForm />

                </Grid>
            </Grid>
        </>
    )
}
export default Signup