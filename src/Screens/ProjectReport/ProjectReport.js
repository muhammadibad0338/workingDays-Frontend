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
import { makeStyles, } from "@mui/styles"
import { styled } from '@mui/system';
import HeadingOne from '../../Components/HeadingOne';
import { connect } from "react-redux";
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

import { getProjectDetails } from "../../Redux/Project/ProjectAction"
import { getProjectsTasks, setTasks } from "../../Redux/Task/TaskAction"


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

const ProjectReport = ({ projectDetails, projectTasks, getProjectDetails, getProjectsTasks, setTasks, completeTask, IncompleteTask }) => {
    const classes = useStyles();
    let { id } = useParams();

    useEffect(() => {
        getProjectDetails(id)
        getProjectsTasks(id)
        return () => {
            setTasks([])
        }

    }, [])

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
});


const mapDispatchToProps = (dispatch) => ({
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    setTasks: (task) => dispatch(setTasks(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectReport);