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

const valStyle = {
    color: 'red',
}
const SignupForm = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            description: '',
            number: '',
            continueas: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(20).required('Please Enter Your Name'),
            email: Yup.string().email().required('Please Enter Your Email'),
            password: Yup.string().min(6).max(20).required('Please Enter Your password'),
            description: Yup.string().min(6).required('Please Enter Your Desription'),
            number: Yup.number().typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(11)
                .required('A phone number is required'),
            continueas: Yup.string().required("A radio option is required"),
        }),
        onSubmit: values => {
            console.log(values,"values")
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
                            name='number'
                            value={formik.values.number}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.number && formik.touched.number ? (
                            <p style={valStyle}>{formik.errors.number}</p>
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

                                <FormControlLabel value='Employee' control={<Radio />} label="Employee" name='continueas' onChange={formik.handleChange} />
                                <FormControlLabel value='Comapany' control={<Radio />} label="Softwarecompany" name='continueas' onChange={formik.handleChange} />
                            </RadioGroup>
                            {formik.errors.continueas && formik.touched.continueas ? (
                                <p style={valStyle}>{formik.errors.continueas}</p>
                            ) : null
                            }
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Box mx={2} className={classes.AlignBtwn}  >
                        <Button type='submit' variant="contained" style={{ margin: '5px 0px', backgroundColor:'#0096FF' }} >
                            Signup
                        </Button>
                        <Typography style={{ textAlign: 'center', marginTop: '5px' , color:'#0096FF'}} >
                            <Link to='/login'  style={{textDecoration:'none',color:'0096FF'}} >
                                Already Have an Account? Login
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignupForm;