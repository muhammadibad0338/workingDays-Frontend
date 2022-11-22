import React, { useState, useEffect } from 'react';
import {
    Drawer,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const CustomDrawer = (props) => {
    const classes = useStyles();
    const { children, isDrawerOpen, toggleDrawer, drawerAnchor, drawerVariant } = props;
    return (
        <Drawer
            anchor={drawerAnchor}
            // anchor='right'
            variant={drawerVariant}
            open={isDrawerOpen}
            onClose={toggleDrawer}
        >
            {children}
        </Drawer>
    )
}

export default CustomDrawer