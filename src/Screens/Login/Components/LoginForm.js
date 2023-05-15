import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
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
    Button,
    CircularProgress
} from "@mui/material";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@mui/styles"
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../../../Redux/User/UserAction';
import { textAlign } from '@mui/system';




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

const LoginForm = ({ loginUser, reduxLoading }) => {
    let navigate = useNavigate();

    //form Validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().email().required('Please Enter Your Email'),
            password: Yup.string().min(6).max(20).required('Please Enter Your Password')

        }),
        onSubmit: values => {
            console.log(values,"login values");
            loginUser(values).then((res) => {
                if (res) {
                    navigate('/')
                }
            })
        },
    });

    //calling css classes
    const classes = useStyles();

    //component
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container style={{margin:'auto 25%'}} >
                <Grid item xs={12}  >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" , color:'#A9A9A9'} }>
                            Email
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            // className={classes.productInput}
                            style={{ width: "50%"  }}
                            type="text"
                            placeholder='user@gmail.com'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p style={{ color: 'red' }}>{formik.errors.email}</p>
                        ) : null
                        }

                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" , color:'#A9A9A9' }}>
                            Password
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            // className={classes.productInput}
                            style={{ width: "50%" }}
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p style={{ color: 'red' }}>{formik.errors.password}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box className={classes.AlignBtwn} m={2} >
                        <Button type='submit' disabled={reduxLoading} variant="contained" style={{ margin: '5px 0px', backgroundColor: '#0096FF' , width:'50%' }} >
                            {reduxLoading ? <CircularProgress /> : 'Login'}
                        </Button>
                        <Typography style={{ textAlign: 'center', marginTop: '5px', color: '#0096FF', width:'50%' }} >
                            <Link to='/signup' style={{ textDecoration: 'none', color: '#0096FF' }}>
                                Don't Have an Account? Signup
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxLoading: store.user.loading
});


const mapDispatchToProps = (dispatch) => ({
    // loginUser: (email, password) => dispatch(loginUser(email, password))
    loginUser: (data) => dispatch(loginUser(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);