import React from 'react';
import { makeStyles, withStyles } from "@mui/styles";
import {
    Box, Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
    },
    mainHead: {
        textTransform: 'uppercase',
        margin: '20px 0px !important'
    },
    mainCntnr: {
        // width: '270px'
    },
    headCntnr: {
        width: '270px',
        // height: '40px',
        backgroundColor: '#EBECF0',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
    },
    mainHead: {
        color: '#5E6C84',
        textTransform: 'uppercase',
    },
    tasksCntnr: {
        width: 'fit-content',
        height: 'auto',
        backgroundColor: '#EBECF0',
        borderRadius: '6px'
    },
    task: {
        backgroundColor: 'white',
        // width:'100%',
        width: '270px',
        height: '80px',
        borderRadius: '6px',
        boxShadow: '1px 1px rgba(23,43,77,0.2),0 0 1px rgba(23,43,77,0.2)'
    }
}));


const Model = ({ modelHeading }) => {
    const classes = useStyles();


    return (
        <Box className={classes.mainCntnr} mr={4} >
            <Box p={2} mb={4} className={classes.headCntnr} >
                <Typography className={classes.mainHead} >{modelHeading} </Typography>
            </Box>
            <Box p={1} mt={4} className={classes.tasksCntnr} >
                <Box p={1} mb={1} className={classes.task} ></Box>
                <Box p={1} mb={1} className={classes.task} ></Box>
                <Box p={1} mb={1} className={classes.task} ></Box>
                <Box p={1} mb={1} className={classes.task} ></Box>
            </Box>
        </Box>
    )
}

export default Model