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
// import bg from "../../Assets/Images/wave2.jpg"
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
            lineHeight: '10px !important',
            fontSize: '1rem !important',
        },
        [theme.breakpoints.down("ms")]: {
            lineHeight: '20px !important',
            fontSize: '1rem !important',
        }
    },
    // bannerImg: {
    //     width: '100%',
    //     height: 'auto'
    // },
    signupsideImg: {
        width: '100%',
        height: '100vh',
        [theme.breakpoints.down("1085")]: {
            display:'none',
        }

    },
    ContainerBorder: {
        // border:'3px solid #3D84E5',
        borderRadius: "10px",
        // padding: '20px',
        height: 'auto'
        // boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    },
    // backImg:
    // {
    //     width: '100%',
    //     minHeight: '100vh !important',
    //     backgroundImage: `url(${bg})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize:'cover',
    //     backgroundPosition: 'center',
    // }
    alignCnter: {
        display: 'flex',
        flexDirection: 'column !important',
        justifyContent: 'center',
        alignItems: 'baseline',

        [theme.breakpoints.down("md")]: {
            alignItems: 'center',
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
        // <div>
        //    <Container maxWidth='md'  >
        //         <Grid container className={classes.ContainerBorder}  >
        //             <Grid item xs={12} >

        //             </Grid>
        //             {/* <Grid item  xs={12}>
        //                  <img src={Banner} className={classes.bannerImg} />
        //             </Grid> */}
        //             <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: "flex" } }} className={classes.alignCnter}  >
        //             </Grid>
        //             <Grid item xs={12} md={6} className={classes.alignCnter} >
        //                 <Typography  className={classes.mainHead}  >Signup</Typography>
        //                 <SignupForm/>
        //             </Grid>

        //         </Grid>
        //     </Container>
        // </div>


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