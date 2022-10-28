import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden
} from "@mui/material";
import { makeStyles } from "@mui/styles"
import { styled } from '@mui/system';
import Banner from "../../Assets/Images/SignupBanner.png"
import SignupForm from './Components/SignupForm';
// import bg from "../../Assets/Images/wave.png"
import bg from "../../Assets/Images/wave2.jpg"


const useStyles = makeStyles((theme) => ({
    mainHead: {
        color: '#0096FF !important' ,
        fontWeight: 'bold !important',
        textTransform: 'uppercase !important',
        textAlign: 'center',
        width: '100%',
        lineHeight: '60px !important',
        fontSize: '3.5rem !important',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '50px !important',
            fontSize: '2.4rem !important',
        },
        [theme.breakpoints.down("ms")]: {
            lineHeight: '30px !important',
            fontSize: '2rem !important',
        }
    },
    bannerImg: {
        width: '100%',
        height: 'auto'
    },
    ContainerBorder:{
        // border:'3px solid #3D84E5',
        borderRadius:"10px",
        padding:'20px',
        height: 'auto'
        // boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    },
    backImg:
    {
        width: '100%',
        minHeight: '100vh !important',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center',
    }
}));

const Signup = () => {
    const classes = useStyles();
    return (
        <div className={classes.backImg}>
           <Container maxWidth='md'  >
                <Grid container className={classes.ContainerBorder}  >
                    <Grid item xs={12} >

                    </Grid>
                    {/* <Grid item  xs={12}>
                         <img src={Banner} className={classes.bannerImg} />
                    </Grid> */}
                    <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: "flex" } }} className={classes.alignCnter}  >
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.alignCnter} >
                        <Typography  className={classes.mainHead}  >Signup</Typography>
                        <SignupForm/>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Signup