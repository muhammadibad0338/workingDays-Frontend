import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden
} from "@mui/material";
// import bg from "../../Assets/Images/wave2.jpg"
import { makeStyles } from "@mui/styles"
import GraphicSide from "../../Assets/Images/loginSide.jpeg"
import LoginForm from './Components/LoginForm';
import { Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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

    sideBanner: {
        [theme.breakpoints.down('nineS')]: {
            display: 'none',

        },
        // transform: 'rotate(180deg)',
        maxHeight: '100vh'
    },

    graphicSide: {
        width: '100%',
        height: '100vh',
        // paddingLeft: theme.spacing(),
    },
    sideForm: {
        marginTop: '10% !important'
    }

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
            <Grid container >

                <Grid item xs={12} nineS={6} className={classes.sideForm}  >
                    <Typography className={classes.mainHead}  ><img src={logo} className={classes.logoImage} /></Typography>
                    <Typography className={classes.mainHead}  >Sign In</Typography>
                    <Typography className={classes.mainHead1}  >Sign in to stay connected.</Typography>
                    <LoginForm />
                </Grid>
                <Grid item xs={0} nineS={6} className={classes.sideBanner} >
                    <img src={GraphicSide} alt="GraphicSide Banner" className={classes.graphicSide} />
                </Grid>
            </Grid>
        </>
    )
}
export default Login