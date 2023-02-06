import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Tooltip,
    Avatar
} from "@mui/material";
import { styled } from '@mui/system';
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
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            // backgroundColor: '#E8EBEF'
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
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
        backgroundColor: 'inherit',
        zIndex: '99',
    }
}));

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
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
                <ColorBox   >
                    <Box className={classes.stickyBox} p={2} >
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={hideDialogHandler} >
                                <ColorText>
                                    <CloseIcon />
                                </ColorText>
                            </IconButton>
                        </Box>
                        <ColorText variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to WorkingDays </ColorText>
                        <Box my={2}  >
                            <ColorText style={{ marginBottom: '-20px' }} >Name or emails</ColorText>
                            <SearchBar
                                onChange={(e) => handelSearch(e)}
                                value={searchQuery}
                                btnClickHandler={btnClickHandler}
                                loading={reduxUserLoading}
                            />

                        </Box>
                    </Box>
                    <Box className={classes.searchResultCntnr}  >
                        {
                            reduxUserLoading ? <CircularProgress /> : searchUser.map((user, ind) => {
                                if (user.role !== "softwareCompany") {
                                    return (
                                        <Box p={2} className={classes.contactBox} key={ind}  >
                                            <Box className={classes.innerContactBox}>
                                                <Tooltip sx={{ background: 'inherit' }} >
                                                    <Avatar src={user?.profilePicture} />
                                                </Tooltip>
                                                <Box ml={1} >
                                                    <ColorText style={{ fontSize: '13px' }} >{user?.name} </ColorText>
                                                    <ColorText style={{ fontSize: '13px' }} >{user?.email} </ColorText>
                                                </Box>
                                            </Box>
                                            {
                                                user?.joinedSoftwareCompany == uid ? <ColorText>Already in your softwareCompany</ColorText>
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

                </ColorBox>
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