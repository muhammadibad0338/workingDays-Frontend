import React from 'react'
import {
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';

const Btn = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg,#1b121d 0,#120f2f 50%,#1b121d 100%)',
    border:'2px solid #570E82',
    color:'white',
    padding:'10px 25px',
    borderRadius:'10px',
    fontWeight:'bold',
    '&:hover':{
        transition: '0.2 s',
        border:'2px solid #1AB6A3',
    }
}));

const ContainedBtn = ({ title,sx, loading  ,...props }) => {
    return (
        <Button variant="contained" sx={sx} {...props} > {loading ? <CircularProgress/> : title } </Button>
    )
}

export default ContainedBtn