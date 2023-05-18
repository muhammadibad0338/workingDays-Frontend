import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden
} from "@mui/material";
import bg from "../../Assets/Images/wave2.jpg"
import { makeStyles } from "@mui/styles"
import loginside from "../../Assets/Images/loginSide.jpeg"
import LoginForm from './Components/LoginForm';
import { Navigate } from "react-router-dom"
import { height } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
    loginsideImg: {
        width: '100%',
        height: '100vh !important',
        [theme.breakpoints.down("1090")]: {
            display:'none',
            overflow:'hidden'
        },
    },
    ContainerBorder: {
        height: 'auto',         
    },
    alignCnter: {
        display: 'flex',
        flexDirection: 'column !important',
        justifyContent: 'center',
        alignItems: 'baseline',
        
        [theme.breakpoints.down("md")]: {
            alignItems: 'center',
            marginTop: '10% !important',
            overflow:'hidden'
        },
        [theme.breakpoints.down("sm")]: {
            alignItems: 'center',
            marginTop: '15% !important',
            overflow:'hidden'
        }, 
    },
}));

const Login = () => {
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
                <Grid item xs={12} md={6} className={classes.alignCnter}  >
                    
                    <Typography className={classes.mainHead}  ><img src={logo} className={classes.logoImage}  /></Typography>
                    <Typography className={classes.mainHead}  >Sign In</Typography>
                    <Typography className={classes.mainHead1}  >Sign in to stay connected.</Typography>

                    <LoginForm />

                </Grid>

                <Grid item xs={12} md={6} >
                    <Item><img src={loginside} className={classes.loginsideImg}></img></Item>
                </Grid>
            </Grid>
        </>
    )
}
export default Login