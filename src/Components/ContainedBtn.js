import React from 'react'
import {
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';

const Btn = styled(Button)(({ theme }) => ({
    // background: '#0096FF',
    backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
    color:'white',
    padding:'10px 25px',
    borderRadius:'10px',
    fontWeight:'bold',
    height:'48px',
    
    '&:hover':{
        transition: '0.8 s',
        // boxShadow: theme.palette.type === "light" ? 'rgb(114, 255, 255) 0px 7px 29px 0px' : '0 0.5rem 1rem rgb(0 0 0 / 50%)' ,
        outline: theme.palette.type === "light" ? '' : '2px solid white'
    }
}));

const ContainedBtn = ({ title,sx, loading  ,...props }) => {
    return (
        <Btn variant="contained" sx={sx} {...props} > {loading ? <CircularProgress/> : title } </Btn>
    )
}

export default ContainedBtn