import React from 'react'
import {
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';

const Btn = styled(Button)(({ theme }) => ({
    background: '#0096FF',
    // border:'2px solid #570E82',
    color:'white',
    padding:'10px 25px',
    borderRadius:'10px',
    fontWeight:'bold',
    height:'48px',
    '&:hover':{
        transition: '0.2 s',
        background: '#0096FF',
        boxShadow: 'rgb(114, 255, 255) 0px 7px 29px 0px',
    }
}));

const ContainedBtn = ({ title,sx, loading  ,...props }) => {
    return (
        <Btn variant="contained" sx={sx} {...props} > {loading ? <CircularProgress/> : title } </Btn>
    )
}

export default ContainedBtn