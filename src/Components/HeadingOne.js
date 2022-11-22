import React from 'react'
import {
    Typography,
} from "@mui/material";
import { styled } from '@mui/system';


const TypographyHead = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight:'bold'
}));

const HeadingOne = ({ title, ...props }) => {
    return (
        <TypographyHead {...props} >{title} </TypographyHead>
    )
}

export default HeadingOne