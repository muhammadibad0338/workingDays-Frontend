import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Tooltip,
    Avatar,
    CircularProgress,
    OutlinedInput,
    NativeSelect,
    InputBase
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
import { getProjectsTasks } from "../../Redux/Task/TaskAction"
import { setTasks, createTask } from "../../Redux/Task/TaskAction"
import { useParams } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";


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


const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: "10px",
        marginTop: "5px",
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const Project = (
    {
        getProjectDetails,
        getProjectsTasks,
        projectDetails,
        setProjectDetails,
        getSearchUsersInTeam,
        reduxUserLoading,
        searchUser,
        addEmployeeToproject,
        currentUser,
        projectTasks,
        reduxTaskLoading,
        setTasks,
        createTask
    }
) => {
    const theme = useTheme();
    const classes = useStyles();
    let navigate = useNavigate();
    const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
    const [isCreateIssueDialogOpen, setIsCreateIssueDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [employee, setEmployee] = useState('')
    const [createTaskCredentials, setCreateTaskCredentials] = useState({
        name: "",
        description: "",
        agileCycle: ""
    })
    const uid = localStorage.getItem('uid')


    let { id } = useParams();

    useEffect(() => {
        getProjectDetails(id)
        getProjectsTasks(id)
        console.log("chala")
        return () => {
            // setProjectDetails({})
            setTasks([])
        }

    }, [])

    const handelSearch = (e) => {
        setSearchQuery(e.target.value)

    }
    const btnClickHandler = () => {
        if (!reduxUserLoading) {
            getSearchUsersInTeam(searchQuery, uid)
        }
    }

    const handleSelectAgileCycle = (e) => {
        setCreateTaskCredentials({
            ...createTaskCredentials,
            agileCycle: e.target.value,
        });
    }

    const handleSelectEmployee = (e) => {
        setEmployee(e.target.value)
    }

    const projectCreateTask = () => {
        console.log('chala projectCreateTask')
        if (createTaskCredentials.agileCycle.trim().length == 0 || createTaskCredentials.description.trim().length == 0 || createTaskCredentials.name.trim().length == 0) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Working Days",
                html: `<strong><font color="black">Please fill all Fields </font></strong>`,
            });
        }
        else {
            // console.log({...createTaskCredentials,employee})
            if (employee.trim().length == 0) {
                createTask({
                    name: createTaskCredentials.name,
                    description: createTaskCredentials.description,
                    agileCycle: createTaskCredentials.agileCycle,
                    project: id,
                    softwareCompany: uid
                }).then((res) => {
                    setCreateTaskCredentials({
                        name: "",
                        description: "",
                        agileCycle: ""
                    })
                    setEmployee('')
                    setIsCreateIssueDialogOpen(false)
                })
            }
            else {
                createTask({
                    name: createTaskCredentials.name,
                    description: createTaskCredentials.description,
                    agileCycle: createTaskCredentials.agileCycle,
                    project: id,
                    softwareCompany: uid,
                    employee: employee
                }).then((res) => {
                    setCreateTaskCredentials({
                        name: "",
                        description: "",
                        agileCycle: ""
                    })
                    setEmployee('')
                    setIsCreateIssueDialogOpen(false)

                })
            }
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
                    {
                        (!reduxTaskLoading || projectTasks.lenght > 0) ?
                            agileCycle.map((phase, ind) => {
                                return (
                                    <Model key={ind} uid={uid} index={ind} modelHeading={phase} projectId={id} tasks={projectTasks.filter(task => task?.agileCycle == phase)} />
                                )
                            }) :
                            <CircularProgress />
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
                        <Box m={2} style={{ width: "50%", }} >
                            <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                Agile Cycle
                            </Typography>
                            <NativeSelect
                                id="demo-customized-select-native"
                                style={{ width: "100%", border: '1px solid gray' }}
                                input={<BootstrapInput />}
                                onChange={(e) => handleSelectAgileCycle(e)}
                            >
                                <option>Select</option>
                                {agileCycle.map((val, i) => (
                                    <option key={i} value={val}>{val}</option>
                                ))}
                            </NativeSelect>
                        </Box>
                        <Box m={2} style={{ width: "50%", }} >
                            <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                Employee (optional)
                            </Typography>
                            <NativeSelect
                                id="demo-customized-select-native"
                                style={{ width: "100%", border: '1px solid gray' }}
                                input={<BootstrapInput />}
                                onChange={(e) => handleSelectEmployee(e)}
                            >
                                <option>Select</option>
                                {projectDetails?.projectTeam?.map((val, i) => {
                                    if (val.role !== "softwareCompany") {
                                        return (
                                            <option key={i} value={val?._id}>{val?.name}</option>
                                        )
                                    }
                                })}
                            </NativeSelect>
                        </Box>
                        <ContainedBtn title="create task" endIcon={<AddIcon />} onClick={projectCreateTask}
                        />
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
    projectDetails: store.project.projectDetails,
    projectTasks: store.task.tasks,
    reduxTaskLoading: store.task.loading,
});


const mapDispatchToProps = (dispatch) => ({
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    setProjectDetails: () => dispatch(getProjectDetails({})),
    getSearchUsersInTeam: (key, uid) => dispatch(getSearchUsersInTeam(key, uid)),
    addEmployeeToproject: (data) => dispatch(addEmployeeToproject(data)),
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    setTasks: (task) => dispatch(setTasks(task)),
    createTask: (data) => dispatch(createTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);