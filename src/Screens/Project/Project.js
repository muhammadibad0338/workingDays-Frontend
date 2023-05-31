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
    InputBase,
    Button
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
import { setTasks, createTask, updateTaskDescription, getProjectsTaskTree } from "../../Redux/Task/TaskAction"
import { useParams } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import moment from 'moment/moment';


import './Components/Model.css'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';



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
        // '&:hover': {
        //     backgroundColor: '#E8EBEF'
        // },
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            // backgroundColor: '#E8EBEF'
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
        }
    },
    productInput: {
        marginTop: "3px",
        // maxWidth: "100%",
        // height: "auto",
        // borderRadius: "10px",
        // marginTop: "10px",
        maxWidth: "100%",
        height: "auto",
        borderRadius: "10px",
        color: `${theme.palette.headTypography.main} !important `,
        border: `1px solid ${theme.palette.headTypography.main}`,
        outline: 'none',
        '&:hover': {
            outline: 'none',
            border: `1px solid ${theme.palette.headTypography.main} !important`,
        },
        '&:focus': {
            outline: 'none',
            border: `1px solid ${theme.palette.headTypography.main} !important`,
        }
    },
    nativeSelect: {
        width: "100%",
        border: '1px solid gray',
        // color: `${theme.palette.headTypography.main} !important `,
        // backgroundColor: `${theme.palette.primary.main} !important `,
    }
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

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));


const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // minHeight: '100vh',
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
        createTask,
        getProjectsTaskTree,
        updateTaskDescription
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
        agileCycle: "",
        deadlineStart: "",
        deadlineEnd: ""
    })

    const [createIssueContinue, setCreateIssueContinue] = useState(false)

    const [taskCreateLoading, settaskCreateLoading] = useState(false)



    const uid = localStorage.getItem('uid')
    const joinedSoftwareCompany = localStorage.getItem('joinedSoftwareCompany')


    let { id } = useParams();

    useEffect(() => {
        getProjectDetails(id)
        getProjectsTasks(id)
        getProjectsTaskTree(id)
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
            getSearchUsersInTeam(searchQuery, joinedSoftwareCompany)
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
        // console.log('chala projectCreateTask')
        settaskCreateLoading(true)
        if (createTaskCredentials.agileCycle.trim().length == 0 ||
            createTaskCredentials.description.trim().length == 0 ||
            createTaskCredentials.name.trim().length == 0 ||
            createTaskCredentials.deadlineStart.trim().length == 0 ||
            createTaskCredentials.deadlineEnd.trim().length == 0
        ) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Working Days",
                html: `<strong><font color="black">Please fill all Fields </font></strong>`,
            });
            setCreateIssueContinue(false)
            settaskCreateLoading(false)

        }
        else {
            // console.log({...createTaskCredentials,employee})
            if (employee.trim().length == 0) {
                createTask({
                    name: createTaskCredentials.name,
                    description: createTaskCredentials.description,
                    agileCycle: createTaskCredentials.agileCycle,
                    project: id,
                    softwareCompany: joinedSoftwareCompany,
                    createdBy: uid,
                    deadlineStart: createTaskCredentials.deadlineStart,
                    deadlineEnd: createTaskCredentials.deadlineEnd
                }).then((res) => {
                    setCreateTaskCredentials({
                        name: "",
                        description: "",
                        agileCycle: "",
                        deadlineStart: "",
                        deadlineEnd: ""
                    })
                    setEmployee('')
                    setIsCreateIssueDialogOpen(false)
                    setCreateIssueContinue(false)
                    settaskCreateLoading(false)
                })
            }
            else {
                createTask({
                    name: createTaskCredentials.name,
                    description: createTaskCredentials.description,
                    agileCycle: createTaskCredentials.agileCycle,
                    project: id,
                    softwareCompany: joinedSoftwareCompany,
                    createdBy: uid,
                    employee: employee,
                    deadlineStart: createTaskCredentials.deadlineStart,
                    deadlineEnd: createTaskCredentials.deadlineEnd
                }).then((res) => {
                    setCreateTaskCredentials({
                        name: "",
                        description: "",
                        agileCycle: "",
                        deadlineStart: "",
                        deadlineEnd: ""
                    })
                    setEmployee('')
                    setIsCreateIssueDialogOpen(false)
                    setCreateIssueContinue(false)
                    settaskCreateLoading(false)

                })
            }
        }
    }




    const agileCycle = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']


    const checkIsAlreadyProjectMember = (uid, projectTeam) => {
        for (let index = 0; index < projectTeam.length; index++) {
            const element = projectTeam[index];
            if (element._id == uid) {
                return false
            }
        }
        return true
    }

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    return (
        <>
            <ColorBox p={3} >
                <ColorText> <Link to='/' style={{ textDecoration: 'none', color: '#5800FF' }} >Projects / </Link> {projectDetails?.name} </ColorText>
                {/* Dialog controller Buttons */}
                <Box className={classes.alignCntnr} my={4} >
                    <ColorText variant='h5' className={classes.mainHead} >{projectDetails?.name}  Board</ColorText>
                    {[0, 1, 2].includes(currentUser?.level) && <IconButton style={{ marginLeft: '10px' }} color="primary" aria-label="upload picture" component="label"
                        onClick={() => setIsAddMemberDialogOpen(true)}
                    >
                        <ColorText>
                            <PersonAddAlt1Icon />
                        </ColorText>
                    </IconButton>}
                    {[0, 1, 2, 3].includes(currentUser?.level) &&
                        <ContainedBtn sx={{ marginTop: '10px', marginLeft: '10px' }} title='Create Issue' endIcon={<AddIcon />}
                            onClick={() => setIsCreateIssueDialogOpen(true)}
                        />}
                </Box>
                {/* Agile Cycle */}
                <AgileCntnr className='agileCycle' pb={2} >
                    {
                        (!reduxTaskLoading || projectTasks?.lenght > 0) ?
                            agileCycle.map((phase, ind) => {
                                return (
                                    <Model key={ind} uid={uid} index={ind} modelHeading={phase} projectId={id} tasks={projectTasks?.filter(task => task?.agileCycle == phase)} />
                                )
                            }) :
                            <CircularProgress />
                    }
                </AgileCntnr>
            </ColorBox>
            {/* Create Issue Dialog */}
            <FullScreenDialog
                maxWidth='sm'
                fullWidth={true}
                open={isCreateIssueDialogOpen}
                hideDialogHandler={() => {
                    setIsCreateIssueDialogOpen(false)
                    setCreateIssueContinue(false)
                }}
            >
                <ColorBox p={2} >
                    <Box>
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close"
                                onClick={() => {
                                    setCreateIssueContinue(false)
                                    setIsCreateIssueDialogOpen(false)
                                }}
                            >
                                <ColorText>
                                    <CloseIcon />
                                </ColorText>
                            </IconButton>
                        </Box>
                        <ColorText variant='h6' style={{ fontWeight: 'bold' }} >Create a Issue  </ColorText>
                    </Box>
                    {createIssueContinue ?
                        <Box my={2} >
                            {Object.keys(projectDetails).length === 0 ? <CircularProgress /> :
                                <LocalizationProvider dateAdapter={AdapterDayjs}   >
                                    <DemoContainer
                                        components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
                                    >
                                        <DemoItem label="Select Task  Starting Date and Ending Date" component="DateRangePicker">
                                            <DateRangePicker defaultValue={[today, tomorrow]} minDate={moment(projectDetails?.createdAt).format("DD/MM/YYYY")}
                                                onChange={(e) => {
                                                    console.log(e[0].$d, "date picker", e[1].$d)
                                                    setCreateTaskCredentials({
                                                        ...createTaskCredentials,
                                                        deadlineStart: e[0].$d ? `${e[0].$d}` : '',
                                                        deadlineEnd: e[1]?.$d ? `${e[1].$d}` : ''
                                                    })
                                                }}
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>}
                            <Box mt={3} >
                                {/* <ContainedBtn title="create task" endIcon={<AddIcon />} onClick={projectCreateTask} disabled={taskCreateLoading} /> */}
                                <Button type='submit' disabled={taskCreateLoading} variant="contained"
                                    style={{ margin: '5px 0px', backgroundColor: '#0096FF' }}
                                    endIcon={<AddIcon />}
                                    onClick={projectCreateTask}
                                >
                                    {taskCreateLoading ? <CircularProgress /> : 'Create task'}
                                </Button>
                            </Box>
                        </Box> :
                        <Box>
                            <Box my={2} style={{ width: "100%" }}>
                                <ColorText style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Task Name
                                </ColorText>
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
                                <ColorText style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Task Description
                                </ColorText>
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
                                <ColorText style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Agile Cycle
                                </ColorText>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    // style={{ width: "100%", border: '1px solid gray' }}
                                    className={classes.nativeSelect}
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
                                <ColorText style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Employee (optional)
                                </ColorText>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    // style={{ width: "100%", border: '1px solid gray' }}
                                    className={classes.nativeSelect}
                                    input={<BootstrapInput />}
                                    onChange={(e) => handleSelectEmployee(e)}
                                >
                                    <option> Select</option>
                                    {projectDetails?.projectTeam?.map((val, i) => {
                                        if (val.role !== "softwareCompany") {
                                            return (
                                                <option key={i} value={val?._id}>{val?.name}</option>
                                            )
                                        }
                                    })}
                                </NativeSelect>
                            </Box>
                            {/* <ContainedBtn title="create task" endIcon={<AddIcon />} onClick={projectCreateTask}
                            /> */}
                            <ContainedBtn title="Continue" onClick={() => setCreateIssueContinue(true)} />
                        </Box>}
                </ColorBox>
            </FullScreenDialog>
            {/* Add Team Member To project Dialog */}
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isAddMemberDialogOpen} hideDialogHandler={() => setIsAddMemberDialogOpen(false)} >
                <ColorBox p={2} >
                    <Box>
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close" onClick={() => setIsAddMemberDialogOpen(false)} >
                                <ColorText>
                                    <CloseIcon />
                                </ColorText>
                            </IconButton>
                        </Box>
                        <ColorText variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to {projectDetails?.name}  </ColorText>
                        <Box my={2} style={{ maxWidth: '300px' }} >
                            <ColorText style={{ marginBottom: '-20px' }} >Name or emails</ColorText>
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
                                                    <ColorText style={{ fontSize: '13px' }} >{user?.name} </ColorText>
                                                    <ColorText style={{ fontSize: '13px' }} >{user?.email} </ColorText>
                                                </Box>
                                            </Box>
                                            {/* <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                addEmployeeToproject({
                                                    projectId: id,
                                                    softwareCompany: uid,
                                                    id: user._id
                                                })
                                            }}
                                            /> */}
                                            {
                                                checkIsAlreadyProjectMember(user?._id, projectDetails?.projectTeam) ?
                                                    <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                        addEmployeeToproject({
                                                            projectId: id,
                                                            softwareCompany: joinedSoftwareCompany,
                                                            id: user._id
                                                        })
                                                    }}
                                                    /> : <ColorText>Already in Project Team</ColorText>
                                            }
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>
                </ColorBox>
            </FullScreenDialog>

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker orientation="landscape" />
            </LocalizationProvider> */}
        </>
    );
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.project.loading,
    currentUser: store.user.user,
    searchUser: store.user.searchUserInTeam,
    projectDetails: store.project.projectDetails,
    projectTasks: store.task.tasks.tasks,
    reduxTaskLoading: store.task.loading,
});


const mapDispatchToProps = (dispatch) => ({
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    setProjectDetails: () => dispatch(getProjectDetails({})),
    getSearchUsersInTeam: (key, uid) => dispatch(getSearchUsersInTeam(key, uid)),
    addEmployeeToproject: (data) => dispatch(addEmployeeToproject(data)),
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    setTasks: (task) => dispatch(setTasks(task)),
    createTask: (data) => dispatch(createTask(data)),
    updateTaskDescription: (data, taskId, projectId) => dispatch(updateTaskDescription(data, taskId, projectId)),
    getProjectsTaskTree: (id) => dispatch(getProjectsTaskTree(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);