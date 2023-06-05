import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    ToggleButtonGroup,
    ToggleButton,
    TableBody,
    TableRow,
    TableContainer,
    Table,
    Tooltip,
    Avatar,
    IconButton,
    CircularProgress,
    Chip,
    TableCell
} from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { makeStyles, } from "@mui/styles"
import { styled } from '@mui/system';
import HeadingOne from '../../Components/HeadingOne';
import { connect } from "react-redux";
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

import { getProjectDetails } from "../../Redux/Project/ProjectAction"
import { getProjectsTasks, setTasks, getProjectsTaskReports } from "../../Redux/Task/TaskAction"
import ReportTable from './Components/ReportTable';
import DoughnutChart from './Components/DoughnutChart';


const useStyles = makeStyles((theme) => ({
    mainHead: {
        textAlign: 'center'
    },
    dFlex: {
        display: 'flex'
    },
    listText: {
        fontSize: '16px !important',
        margin: '5px 0px'
    }
}));

const BoxDisplayForState = ({ stateName, currentState, }) => {
    const classes = useStyles();

    return (
        <Box className={classes.dFlex} my={1} >
            <Typography variant='h5' sx={{ color: '#21268C', mr: 1 }} >{stateName} :  </Typography>
            <Typography variant='h5' > {currentState}</Typography>
        </Box>
    )
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const ProjectReport = ({
    projectDetails,
    projectTasks,
    getProjectDetails,
    getProjectsTasks,
    setTasks,
    completeTask,
    IncompleteTask,
    getProjectsTaskReports,
    projectTasksReports
}) => {
    const classes = useStyles();
    let { id } = useParams();

    const [employeeID, setemployeeID] = useState('')

    useEffect(() => {
        getProjectDetails(id)
        getProjectsTasks(id)
        getProjectsTaskReports(id, employeeID)
        return () => {
            setTasks([])
        }

    }, [])

    const getEmployeeTaskReport = (employee) => {
        setemployeeID(employee)
        getProjectsTaskReports(id, employee)
    }

    return (
        <Grid container p={4} >
            <Grid item xs={12} mb={5} >
                <HeadingOne className={classes.mainHead} title='Project Report' />
            </Grid>
            <Grid item xs={12} >
                <BoxDisplayForState stateName='Project ID' currentState={projectDetails?._id} />
                <BoxDisplayForState stateName='Project Name' currentState={projectDetails?.name} />
                <Box className={classes.dFlex} my={1} >
                    <Typography variant='h5' sx={{ color: '#21268C', mr: 1 }} >Project Description :  </Typography>
                    <Typography variant='h6' > {projectDetails?.description}</Typography>
                </Box>
                <BoxDisplayForState stateName='Created At' currentState={moment(projectDetails?.createdAt).format("DD/MM/YYYY")} />
            </Grid>
            <Grid item xs={12} mt={3} >
                <HeadingOne title='Project Owner' />
            </Grid>
            <Grid item xs={12} md={6} >
                <BoxDisplayForState stateName='Project Owner' currentState={projectDetails?.projectOwner?._id} />
                <BoxDisplayForState stateName='Project Owner Contact' currentState={projectDetails?.projectOwner?.phoneNumber} />
            </Grid>
            <Grid item xs={12} md={6} >
                <BoxDisplayForState stateName='Project Owner Name' currentState={projectDetails?.projectOwner?.name} />
                <BoxDisplayForState stateName='Project Owner email' currentState={projectDetails?.projectOwner?.email} />
            </Grid>
            <Grid item xs={12} mt={3} >
                <HeadingOne title='Project Team' />
                <BoxDisplayForState stateName='Total Team Members' currentState={projectDetails?.projectTeam?.length} />
                <Typography variant='h5' sx={{ mt: 2 }} >Team Members: </Typography>
                <Box pl={5} >
                    <ol>
                        {
                            projectDetails?.projectTeam?.map((team, ind) => (
                                <li className={classes.listText} key={ind} >{team?.name} </li>
                            ))
                        }
                    </ol>
                </Box>
            </Grid>
            <Grid item xs={12} mt={3}>
                <HeadingOne title='Project Tasks' />
            </Grid>
            <Grid item xs={12} sm={4} >
                <BoxDisplayForState stateName='Total Task' currentState={projectTasks?.length} />
            </Grid>
            <Grid item xs={12} sm={4} >
                <BoxDisplayForState stateName='Complete  Task' currentState={completeTask?.length} />
            </Grid>
            <Grid item xs={12} sm={4} >
                <BoxDisplayForState stateName='Incomplete Task' currentState={IncompleteTask?.length} />
            </Grid>

            <Grid item xs={12} mt={5} >
                <Box m={2} style={{ width: "50%", }} >
                    <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                        Select Employee
                    </Typography>
                    <NativeSelect
                        id="demo-customized-select-native"
                        // style={{ width: "100%", border: '1px solid gray' }}
                        className={classes.nativeSelect}
                        input={<BootstrapInput />}
                        onChange={(e) => getEmployeeTaskReport(e.target.value)}
                    >
                        <option value='' >All Employee</option>
                        {projectDetails?.projectTeam.map((team, i) => (
                            <option key={i} value={team?._id}> {team?.name}</option>
                        ))}
                    </NativeSelect>
                </Box>
            </Grid>
            <Grid item xs={12} mt={2} >
                <ReportTable taskReports={projectTasksReports?.tasks} />
            </Grid>
            <Grid item xs={12} md={6} mt={5} >
                <DoughnutChart tasksStatus={projectTasksReports?.tasksStatus} />
            </Grid>
        </Grid>
    )
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.user.loading,
    currentUser: store.user.user,
    projectDetails: store.project.projectDetails,
    projectTasks: store.task.tasks.tasks,
    completeTask: store.task.tasks.completeTasks,
    IncompleteTask: store.task.tasks.IncompleteTask,
    projectTasksReports: store.task.projectTaskReports,
});


const mapDispatchToProps = (dispatch) => ({
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    getProjectsTaskReports: (id, employeeId) => dispatch(getProjectsTaskReports(id, employeeId)),
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    setTasks: (task) => dispatch(setTasks(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectReport);