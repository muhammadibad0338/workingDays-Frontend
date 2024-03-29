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
import { connect } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import { getUserRequest, updateRequestStatus } from '../../Redux/User/UserAction';

// styling
const useStyles = makeStyles((theme) => ({
    alignEnd: {
        width: '100% !important',
        display: 'flex',
        justifyContent: 'end',
    },
}));

const NotificationDrawer = styled(Box)(({ theme }) => ({
    width: '250px',
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: '#F1F5F9'

}))
const NotificationBox = styled(Box)(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: '100px',
    // backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    display: 'flex',
    border: theme.palette.type == "light" ? 'none' : '1px solid #0095FF'
}))

const ColorToggleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const Notification = ({ toggleNotificationDrawer, userRequest, getUserRequest, currentUser, updateRequestStatus }) => {
    const classes = useStyles();
    const uid = localStorage.getItem('uid')

    useEffect(() => {
        getUserRequest(uid)
    }, [])

    return (
        <NotificationDrawer px={2} >
            <Box className={classes.alignEnd} mb={4} >
                <IconButton aria-label="Close" onClick={toggleNotificationDrawer} >
                    <ColorToggleText  >
                        <CloseIcon fontSize='large' />
                    </ColorToggleText>
                </IconButton>
            </Box>
            <ColorToggleText variant='h4' style={{ fontWeight: '600', marginBottom: '32px' }} >Notifications</ColorToggleText>

            {
                userRequest.length === 0 ? <CircularProgress /> : <>
                    {
                        userRequest.map((request, ind) => {
                            if (currentUser?.role === "softwareCompany") {
                                return (
                                    <NotificationBox my={2} p={2} key={ind} >
                                        <Tooltip sx={{ background: 'inherit' }} >
                                            <Avatar src={request?.employee?.profilePicture} />
                                        </Tooltip>
                                        <Box ml={2} >
                                            <ColorToggleText style={{ fontSize: '15px', fontWeight: 'bold' }} >Joining Request </ColorToggleText>
                                            {request?.status === "Pending" && <ColorToggleText style={{ fontSize: '13px' }} >you sent you a joining Request to {request?.employee?.name} </ColorToggleText>}
                                            {request?.status === "Rejected" && <ColorToggleText style={{ fontSize: '13px' }} > {request?.employee?.name}  REJECT your  joining request </ColorToggleText>}
                                            {request?.status === "Accepted" && <ColorToggleText style={{ fontSize: '13px' }} >{request?.employee?.name}  ACCEPTED  your joining Request   </ColorToggleText>}
                                        </Box>
                                    </NotificationBox>
                                )
                            }
                            return (
                                <NotificationBox my={2} p={2} key={ind} >
                                    <Tooltip >
                                        <Avatar src={request?.softwareCompany?.profilePicture} />
                                    </Tooltip>
                                    <Box ml={2} >
                                        <Typography style={{ fontSize: '15px', fontWeight: 'bold' }} >Joining Request </Typography>
                                        {request?.status === "Pending" && <Typography style={{ fontSize: '13px' }} >{request?.softwareCompany?.name} sent you a joining Request</Typography>}
                                        {request?.status === "Rejected" && <Typography style={{ fontSize: '13px' }} >You REJECT a joining request from {request?.softwareCompany?.name} Compnay </Typography>}
                                        {request?.status === "Accepted" && <Typography style={{ fontSize: '13px' }} >you ACCEPTED  a joining Request from {request?.softwareCompany?.name} </Typography>}
                                        {request?.status === "Pending" && <Box m={1} className={classes.alignEnd} >
                                            <Button variant="contained" color="success" onClick={() => {
                                                updateRequestStatus(request?._id, {
                                                    employee: request?.employee?._id,
                                                    softwareCompany: request?.softwareCompany?._id,
                                                    status: 'Accepted'
                                                }, currentUser?.role)
                                            }} >
                                                <DoneIcon />
                                            </Button>
                                            <Button variant="contained" color="error" style={{ marginLeft: '8px' }} onClick={() => {
                                                updateRequestStatus(request?._id, {
                                                    employee: request?.employee?._id,
                                                    softwareCompany: request?.softwareCompany?._id,
                                                    status: 'Rejected'
                                                }, currentUser?.role)
                                            }} >
                                                <CloseIcon />
                                            </Button>
                                        </Box>}
                                    </Box>
                                </NotificationBox>
                            )
                        })
                    }
                </>
            }

        </NotificationDrawer>
    )
}

// export default Notification
//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.user.loading,
    currentUser: store.user.user,
    userRequest: store.user.userRequest
});


const mapDispatchToProps = (dispatch) => ({
    getUserRequest: (id) => dispatch(getUserRequest(id)),
    updateRequestStatus: (id, data, role) => dispatch(updateRequestStatus(id, data, role))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);