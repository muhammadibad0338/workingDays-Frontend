import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Drawer,
    CircularProgress,
    Button,
    IconButton,
    Tooltip,
    Avatar
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';

// styling
const useStyles = makeStyles((theme) => ({
    alignEnd: {
        width: '100% !important',
        display: 'flex',
        justifyContent: 'end',
    },
}));

const NotificationDrawer = styled(Box)(({ }) => ({
    width: '250px',
    minHeight: '100vh',
    backgroundColor: '#F1F5F9'
}))
const NotificationBox = styled(Box)(({ }) => ({
    maxWidth: '100%',
    maxHeight: '100px',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    display:'flex'
}))

const Notification = ({ toggleNotificationDrawer }) => {
    const classes = useStyles();
    return (
        <NotificationDrawer px={2} >
            <Box className={classes.alignEnd} mb={4} >
                <IconButton aria-label="Close" onClick={toggleNotificationDrawer} >
                    <CloseIcon style={{ color: 'black' }} fontSize='large' />
                </IconButton>
            </Box>
            <Typography variant='h4' style={{ fontWeight: '600', marginBottom: '32px' }} >Notifications</Typography>
            <NotificationBox my={2} p={2}>
                    <Tooltip >
                        <Avatar src="https://avatars.githubusercontent.com/u/59511357?v=4" />
                    </Tooltip>
                    <Box ml={2} >
                        <Typography style={{ fontSize: '15px',fontWeight:'bold' }} >Employee Request </Typography>
                        <Typography style={{ fontSize: '13px' }} >Working Days sent you a employee Request</Typography>
                    </Box>
            </NotificationBox>
            <NotificationBox my={2} p={2}>
                    <Tooltip >
                        <Avatar src="https://avatars.githubusercontent.com/u/59511357?v=4" />
                    </Tooltip>
                    <Box ml={2} >
                        <Typography style={{ fontSize: '15px',fontWeight:'bold' }} >Employee Request </Typography>
                        <Typography style={{ fontSize: '13px' }} >Working Days sent you a employee Request</Typography>
                    </Box>
            </NotificationBox>
            <NotificationBox my={2} p={2}>
                    <Tooltip >
                        <Avatar src="https://avatars.githubusercontent.com/u/59511357?v=4" />
                    </Tooltip>
                    <Box ml={2} >
                        <Typography style={{ fontSize: '15px',fontWeight:'bold' }} >Employee Request </Typography>
                        <Typography style={{ fontSize: '13px' }} >Working Days sent you a employee Request</Typography>
                    </Box>
            </NotificationBox>
            <NotificationBox my={2} p={2}>
                    <Tooltip >
                        <Avatar src="https://avatars.githubusercontent.com/u/59511357?v=4" />
                    </Tooltip>
                    <Box ml={2} >
                        <Typography style={{ fontSize: '15px',fontWeight:'bold' }} >Employee Request </Typography>
                        <Typography style={{ fontSize: '13px' }} >Working Days sent you a employee Request</Typography>
                    </Box>
            </NotificationBox>
            <NotificationBox my={2} p={2}>
                    <Tooltip >
                        <Avatar src="https://avatars.githubusercontent.com/u/59511357?v=4" />
                    </Tooltip>
                    <Box ml={2} >
                        <Typography style={{ fontSize: '15px',fontWeight:'bold' }} >Employee Request </Typography>
                        <Typography style={{ fontSize: '13px' }} >Working Days sent you a employee Request</Typography>
                    </Box>
            </NotificationBox>

        </NotificationDrawer>
    )
}

export default Notification