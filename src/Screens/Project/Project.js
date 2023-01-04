import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Tooltip,
    Avatar,
    CircularProgress
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import Model from './Components/Model';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenDialog from '../../Components/Dialog';
import SearchBar from '../../Components/SearchBar';
import ContainedBtn from '../../Components/ContainedBtn';
import { connect } from "react-redux";
import { getProjectDetails, setProjectDetails, addEmployeeToproject } from "../../Redux/Project/ProjectAction"
import { getSearchUsersInTeam } from '../../Redux/User/UserAction';
import { useParams } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
    },
    mainHead: {
        textTransform: 'uppercase',
        margin: '20px 0px !important',

    },
    modelCntnr: {
        display: 'flex',
        flexFlow: 'row nowrap',
        position: 'sticky',
        width: 'auto',
        height: '100%',
        overflow: 'auto !important',
        flex: '1 1 0%',
    },
    alignCntnr: {
        display: 'flex',
        // backgroundColor:'yellow'
    },
    alignEnd: {
        width: '570px !important',
        display: 'flex',
        justifyContent: 'end',
    },
    innerContactBox: {
        // minWidth:'auto',
        width: 'auto',
        display: 'flex',
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
}));



const AgileCntnr = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'sticky',
    width: 'auto',
    height: '100%',
    overflow: 'auto !important',
    whiteSpace: 'nowrap',
    flex: '1 1 0%',
}));


function MiniDrawer({ getProjectDetails, projectDetails, setProjectDetails, getSearchUsersInTeam, reduxUserLoading, searchUser, addEmployeeToproject }) {
    const theme = useTheme();
    const classes = useStyles();
    let navigate = useNavigate();
    const [isDialogOpen, setisDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const uid = localStorage.getItem('uid')


    let { id } = useParams();

    useEffect(() => {
        getProjectDetails(id)

        // return () => {
        //     setProjectDetails({})
        // }

    }, [])

    const handelSearch = (e) => {
        setSearchQuery(e.target.value)

    }
    const btnClickHandler = () => {
        if (!reduxUserLoading) {
            getSearchUsersInTeam(searchQuery, uid)
        }
    }


    return (
        <>
            <Box p={3} >
                <Typography> <Link to='/' style={{ textDecoration: 'none' }} >Projects / </Link> {projectDetails?.name} </Typography>
                <Box className={classes.alignCntnr} >
                    <Typography variant='h5' className={classes.mainHead} >{projectDetails?.name}  Board</Typography>
                    <IconButton style={{ marginLeft: '10px' }} color="primary" aria-label="upload picture" component="label"
                        onClick={() => setisDialogOpen(true)}
                    >
                        <PersonAddAlt1Icon />
                    </IconButton>
                </Box>
                <AgileCntnr  >
                    <Model modelHeading='Requirments' />
                    <Model modelHeading='Design' />
                    <Model modelHeading='develop' />
                    <Model modelHeading='test' />
                    <Model modelHeading='deploy' />
                    <Model modelHeading='maintenance' />
                </AgileCntnr>
            </Box>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={() => setisDialogOpen(false)} >
                <Box p={2} >
                    <Box>

                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={() => setisDialogOpen(false)} >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Typography variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to {projectDetails?.name}  </Typography>
                        <Box my={2} style={{ maxWidth: '300px' }} >
                            <Typography style={{ marginBottom: '-20px' }} >Name or emails</Typography>
                            <SearchBar
                                onChange={(e) => handelSearch(e)}
                                value={searchQuery}
                                btnClickHandler={btnClickHandler}
                                loading={reduxUserLoading}
                            />
                            {/* <Box mt={1} className={classes.alignEnd} >
                            <ContainedBtn title="ADD" />
                        </Box> */}
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
                                            <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                addEmployeeToproject({
                                                    projectId: id,
                                                    softwareCompany: uid,
                                                    id: user._id
                                                })
                                            }}
                                            />
                                            {/* {
                                                user?.joinedSoftwareCompany == uid ? <Typography>Already in your softwareCompany</Typography>
                                                    : <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                        sentRequest({
                                                            employee: user._id,
                                                            softwareCompany: uid
                                                        })
                                                    }} />
                                            } */}
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>
                </Box>
            </FullScreenDialog>
        </>
    );
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.project.loading,
    currentUser: store.user.user,
    searchUser: store.user.searchUserInTeam,
    projectDetails: store.project.projectDetails
});


const mapDispatchToProps = (dispatch) => ({
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    setProjectDetails: () => dispatch(getProjectDetails({})),
    getSearchUsersInTeam: (key, uid) => dispatch(getSearchUsersInTeam(key, uid)),
    addEmployeeToproject: (data) => dispatch(addEmployeeToproject(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);