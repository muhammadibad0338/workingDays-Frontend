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
import { makeStyles, withStyles } from "@mui/styles"
import { styled } from '@mui/system';
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../../Redux/User/UserAction';

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

const valStyle = {
    color: 'red',
}
const SignupForm = ({ reduxLoading, registerUser }) => {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            description: '',
            phoneNumber: '',
            role: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(20).required('Please Enter Your Name'),
            email: Yup.string().email().required('Please Enter Your Email'),
            password: Yup.string().min(6).max(20).required('Please Enter Your password'),
            description: Yup.string().min(6).required('Please Enter Your Desription'),
            phoneNumber: Yup.number().typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(11)
                .required('A phone number is required'),
            role: Yup.string().required("Please Select Your Role"),
        }),
        onSubmit: values => {
            console.log(values, "values")
            registerUser(values).then((res) => {
                if (res) {
                    navigate('/')
                }
            })
        }
    })

    const classes = useStyles();
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container >
                <Grid item xs={12} md={6} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                            Name
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            // className={classes.productInput}
                            style={{ width: "100%" }}
                            type="text"
                            placeholder='working days'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}

                        />
                        {formik.errors.name && formik.touched.name ? (
                            <p style={valStyle}>{formik.errors.name}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                            Email
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            style={{ width: "100%" }}
                            type="text"
                            placeholder='user@gmail.com'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p style={valStyle}>{formik.errors.email}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                            Password
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            // className={classes.productInput}
                            style={{ width: "100%" }}
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p style={valStyle}>{formik.errors.password}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                            Description
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            multiline
                            rows={3}
                            // className={classes.productInput}
                            style={{ width: "100%" }}
                            type="text"
                            placeholder='Description'
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.description && formik.touched.description ? (
                            <p style={valStyle}>{formik.errors.description}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box my={1} mx={2} style={{ width: "auto" }}>
                        <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                            Number
                        </Typography>
                        <OutlinedInput
                            fullwidth="true"
                            // className={classes.productInput}
                            style={{ width: "100%" }}
                            type="number"
                            placeholder='03XXXXXXXX'
                            name='phoneNumber'
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                            <p style={valStyle}>{formik.errors.phoneNumber}</p>
                        ) : null
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <FormControl>
                        <Box my={1} mx={2} style={{ width: "auto" }}>
                            <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                Continue As
                            </Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                            // value={value}
                            // onChange={handleChange}
                            >

                                <FormControlLabel value='Employee' control={<Radio />} label="Employee" name='role' onChange={formik.handleChange} />
                                <FormControlLabel value='softwareCompany' control={<Radio />} label="Software Company" name='role' onChange={formik.handleChange} />
                            </RadioGroup>
                            {formik.errors.role && formik.touched.role ? (
                                <p style={valStyle}>{formik.errors.role}</p>
                            ) : null
                            }
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Box mx={2} className={classes.AlignBtwn}  >
                        <Button type='submit' disabled={reduxLoading} variant="contained" style={{ margin: '5px 0px', backgroundColor: '#0096FF' }} >
                            {reduxLoading ? <CircularProgress /> : 'Signup'}
                        </Button>
                        <Typography style={{ textAlign: 'center', marginTop: '5px', color: '#0096FF' }} >
                            <Link to='/login' style={{ textDecoration: 'none', color: '0096FF' }} >
                                Already Have an Account? Login
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
    registerUser: (data) => dispatch(registerUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);