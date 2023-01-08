import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Tooltip,
    Avatar,
    CircularProgress,
    OutlinedInput
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
import AddIcon from '@mui/icons-material/Add';


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
    productInput: {
        marginTop: "3px",
        maxWidth: "100%",
        height: "auto",
        borderRadius: "10px",
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


function MiniDrawer({ getProjectDetails, projectDetails, setProjectDetails, getSearchUsersInTeam, reduxUserLoading, searchUser, addEmployeeToproject, currentUser }) {
    const theme = useTheme();
    const classes = useStyles();
    let navigate = useNavigate();
    const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
    const [isCreateIssueDialogOpen, setIsCreateIssueDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [createTaskCredentials, setCreateTaskCredentials] = useState({
        name: "",
        description: "",
        agileCycle: ""
    })
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
    const agileCycle = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']

    return (
        <>
            <Box p={3} >
                <Typography> <Link to='/' style={{ textDecoration: 'none' }} >Projects / </Link> {projectDetails?.name} </Typography>
                <Box className={classes.alignCntnr} >
                    <Typography variant='h5' className={classes.mainHead} >{projectDetails?.name}  Board</Typography>
                    {currentUser?.role == "softwareCompany" && <IconButton style={{ marginLeft: '10px' }} color="primary" aria-label="upload picture" component="label"
                        onClick={() => setIsAddMemberDialogOpen(true)}
                    >
                        <PersonAddAlt1Icon />
                    </IconButton>}
                    {currentUser?.role == "softwareCompany" &&
                        <ContainedBtn sx={{ marginTop: '10px', marginLeft: '10px' }} title='Create Issue' endIcon={<AddIcon />}
                            onClick={() => setIsCreateIssueDialogOpen(true)}
                        />}
                </Box>
                <AgileCntnr  >
                    {/* <Model modelHeading={agileCycle[0]} />
                    <Model modelHeading={agileCycle[1]}  />
                    <Model modelHeading={agileCycle[1]}  />
                    <Model modelHeading={agileCycle[1]}  />
                    <Model modelHeading={agileCycle[1]}  />
                    <Model modelHeading={agileCycle[1]}  /> */}
                    {
                        agileCycle.map((phase,ind)=>{
                            return(
                                <Model modelHeading={phase} />
                            )
                        })
                    }
                </AgileCntnr>
            </Box>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isCreateIssueDialogOpen} hideDialogHandler={() => setIsCreateIssueDialogOpen(false)} >
                <Box p={2} >
                    <Box>
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={() => setIsCreateIssueDialogOpen(false)} >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Typography variant='h6' style={{ fontWeight: 'bold' }} >Create a Issue  </Typography>
                    </Box>
                    <Box>
                        <Box my={2} style={{ width: "100%" }}>
                            <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                Task Name
                            </Typography>
                            <OutlinedInput
                                fullwidth
                                required={true}
                                className={classes.productInput}
                                style={{ width: "100%" }}
                                placeholder="Task Name"
                                type="text"
                                value={createTaskCredentials.name}
                                onChange={(e) => {
                                    setCreateTaskCredentials({
                                        ...createTaskCredentials,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </Box>
                        <Box my={2} style={{ width: "100%" }}>
                            <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                Task Description
                            </Typography>
                            <OutlinedInput
                                fullwidth
                                required={true}
                                className={classes.productInput}
                                style={{ width: "100%" }}
                                placeholder="Task Description"
                                type="text"
                                rows={2}
                                multiline={true}
                                value={createTaskCredentials.description}
                                onChange={(e) => {
                                    setCreateTaskCredentials({
                                        ...createTaskCredentials,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </FullScreenDialog>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isAddMemberDialogOpen} hideDialogHandler={() => setIsAddMemberDialogOpen(false)} >
                <Box p={2} >
                    <Box>
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={() => setIsAddMemberDialogOpen(false)} >
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