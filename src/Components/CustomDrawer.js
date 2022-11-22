import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Drawer,
    CircularProgress,
    Button
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
    closeIconBtnCntnr: {
        width: '330px',
        display: 'flex',
        justifyContent: 'end',
        margin: '20px 0px'
    },
    sliderCntnr: {
        disply: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '330px',
        paddingLeft: '20px'
    },
}));

const CustomDrawer = ({ children, isDrawerOpen, toggleDrawer, drawerAnchor, drawerVariant }) => {
    const classes = useStyles();
    return (
        <Drawer
            anchor={drawerAnchor}
            variant={drawerVariant}
            open={isDrawerOpen}
            onClose={toggleDrawer}
        >
            {children}
        </Drawer>
    )
}

export default CustomDrawer