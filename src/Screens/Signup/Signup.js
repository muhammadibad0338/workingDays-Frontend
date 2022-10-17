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

const useStyles = makeStyles((theme) => ({
    mainHead: {
        color: '#3D84E5',
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
        boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    }
}));

const Signup = () => {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth='fl'  >
                <Grid container mt={2} className={classes.ContainerBorder}  >
                    <Grid item xs={12} >
                    <Typography className={classes.mainHead}  >Signup</Typography>
                    </Grid>
                    <Grid item xs={12} md={5} >
                    <SignupForm/>
                    </Grid>
                    <Grid item xs={0} md={1} ></Grid>
                    <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: "flex" } }} >
                        <img src={Banner} className={classes.bannerImg} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Signup