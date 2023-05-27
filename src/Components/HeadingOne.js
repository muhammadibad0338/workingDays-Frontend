import React from 'react'
import {
    Typography,
} from "@mui/material";
import { styled } from '@mui/system';


const TypographyHead = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight:'bold',
    color:'#FFFFFF !important',
    // color: theme.palette.headTypography.main,
}));

const TypographyText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight:'bold',
    color:'#FFFFFF !important',

    // color: theme.palette.headTypography.main,
}));

const HeadingOne = ({ title,btmText, ...props }) => {
    return (
        <>
        <TypographyHead {...props} >{title} </TypographyHead>
        <TypographyText {...props} >{btmText} </TypographyText>
        </>
    )
}

export default HeadingOne