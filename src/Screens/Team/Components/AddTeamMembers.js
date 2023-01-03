import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Tooltip,
    Avatar
} from "@mui/material";
import { makeStyles, } from "@mui/styles"
import CloseIcon from '@mui/icons-material/Close';
import FullScreenDialog from '../../../Components/Dialog';
import ContainedBtn from '../../../Components/ContainedBtn';
import SearchBar from '../../../Components/SearchBar';
import { connect } from "react-redux";
import { getSearchUsers, sentRequest } from '../../../Redux/User/UserAction';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const useStyles = makeStyles((theme) => ({
    alignEnd: {
        // width: '570px !important',
        display: 'flex',
        justifyContent: 'end',
    },
    searchResultCntnr: {
        width: '100%',
        height: 'auto',
        maxHeight: '100px',
    },
    contactBox: {
        // minWidth:'auto',
        width: 'auto',
        maxWidth: '550px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid gray',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#E8EBEF'
        }
    },
    innerContactBox: {
        // minWidth:'auto',
        width: 'auto',
        display: 'flex',
    },
    stickyBox: {
        position: '-webkit-sticky',
        position: 'sticky',
        // top: '30px',
        backgroundColor: '#FFFFFF',
        zIndex: '99',
    }
}));


const AddTeamMembers = ({ isDialogOpen, hideDialogHandler, getSearchUsers, reduxUserLoading, searchUser, userTeam, sentRequest }) => {
    const classes = useStyles();
    const [showClear, setshowClear] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [searchLoading, setsearchLoading] = useState(false)
    const uid = localStorage.getItem('uid')

    const handelSearch = (e) => {
        setSearchQuery(e.target.value)

    }
    const btnClickHandler = () => {
        if (!reduxUserLoading) {
            getSearchUsers(searchQuery)
        }
    }



    return (
        <>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={hideDialogHandler} >
                <Box p={2} >
                    <Box className={classes.stickyBox}  >
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={hideDialogHandler} >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Typography variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to WorkingDays </Typography>
                        <Box my={2}  >
                            <Typography style={{ marginBottom: '-20px' }} >Name or emails</Typography>
                            <SearchBar
                                onChange={(e) => handelSearch(e)}
                                value={searchQuery}
                                btnClickHandler={btnClickHandler}
                                loading={reduxUserLoading}
                            />

                        </Box>
                    </Box>
                    <Box className={classes.searchResultCntnr} >
                        {
                            reduxUserLoading ? <CircularProgress /> : searchUser.map((user, ind) => {
                                if (user.role !== "softwareCompany") {
                                    return (
                                        <Box p={2} className={classes.contactBox} key={ind}  >
                                            <Box className={classes.innerContactBox}>
                                                <Tooltip >
                                                    <Avatar src={user?.profilePicture} />
                                                </Tooltip>
                                                <Box ml={1} >
                                                    <Typography style={{ fontSize: '13px' }} >{user?.name} </Typography>
                                                    <Typography style={{ fontSize: '13px' }} >{user?.email} </Typography>
                                                </Box>
                                            </Box>
                                            {
                                                user?.joinedSoftwareCompany == uid ? <Typography>Already in your softwareCompany</Typography>
                                                    : <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                        sentRequest({
                                                            employee: user._id,
                                                            softwareCompany: uid
                                                        })
                                                    }} />
                                            }
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>

                </Box>
            </FullScreenDialog>
        </>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.user.loading,
    currentUser: store.user.user,
    searchUser: store.user.searchUser,
    userTeam: store.user.userTeam
});


const mapDispatchToProps = (dispatch) => ({
    getSearchUsers: (key) => dispatch(getSearchUsers(key)),
    sentRequest: (data) => dispatch(sentRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamMembers);