import React, { useEffect, useState } from 'react'
import {
    CircularProgress,
    Divider,
    Grid,
    Typography,
    Box
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';

import { getProjectsTasks, addTaskDependency } from '../../../Redux/Task/TaskAction';
import { getProjectDetails } from "../../../Redux/Project/ProjectAction"
import ContainedBtn from '../../../Components/ContainedBtn';

const useStyles = makeStyles((theme) => ({
    TaskContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    alignEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    alignBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const TaskBox = styled(Box)(({ theme, isSelected }) => ({
    backgroundColor: theme.palette.primary.main,
    width: '270px',
    minHeight: '80px',
    borderRadius: '6px',
    border: '1px solid #0095FF',
    cursor: 'pointer',
    boxShadow: isSelected ? 'rgb(114, 255, 255) 0px 7px 29px 0px' : '',

}));

const AddTaskDependency = ({ projectTasks, getProjectsTasks, reduxTaskLoading, getProjectDetails, addTaskDependency }) => {
    let { id } = useParams();
    const classes = useStyles();
    const navigate = useNavigate()

    const [selectedTask, setSelectedTask] = useState('')
    const [parentTask, setParentTask] = useState([])
    const [isContinue, setIsContinue] = useState(false)
    const [addTaskDependencyLoading, setAddTaskDependencyLoading] = useState(false)

    useEffect(() => {
        if (projectTasks.length === 0) {
            getProjectsTasks(id)
            getProjectDetails(id)
        }
    }, [])


    return (
        <>
            {!isContinue ?
                <Grid container >
                    <Grid item xs={12} my={2} >
                        <ColorText variant='h4' sx={{ textAlign: 'center' }} >Select a Task which you want to make DEPENDENT</ColorText>
                    </Grid>
                    <Grid item xs={12} className={classes.TaskContainer} >
                        {
                            (!reduxTaskLoading || projectTasks?.lenght > 0) ?
                                projectTasks?.map((task, ind) => {
                                    return (
                                        <TaskBox key={ind} m={2}
                                            onClick={() => setSelectedTask(task._id)}
                                            isSelected={selectedTask === task._id ? true : false}
                                        >
                                            <Box p={1} >
                                                <ColorText sx={{ textAlign: 'center' }} >{task?._id}</ColorText>
                                            </Box>
                                            <Divider />
                                            <Box p={1} >
                                                <ColorText>{task?.name}</ColorText>
                                            </Box>
                                        </TaskBox>
                                    )
                                }) :
                                <CircularProgress />
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.alignEnd} m={2} >
                        <ContainedBtn
                            endIcon={<ArrowForwardIcon />}
                            disabled={selectedTask.trim().length === 24 ? false : true}
                            title="Continue"
                            onClick={() => setIsContinue(true)}
                        />
                    </Grid>
                </Grid>
                :
                <Grid container >
                    <Grid item xs={12} my={2} >
                        <ColorText variant='h4' sx={{ textAlign: 'center' }} >Now Selects  Parent Tasks</ColorText>
                    </Grid>
                    <Grid item xs={12} className={classes.TaskContainer} >
                        {
                            (!reduxTaskLoading || projectTasks?.lenght > 0) ?
                                projectTasks?.map((task, ind) => {
                                    if (selectedTask !== task._id) {
                                        return (
                                            <TaskBox key={ind} m={2}
                                                onClick={() => setParentTask([...parentTask, task._id])}
                                                isSelected={parentTask.includes(task._id)}
                                            >
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center' }} >{task?._id}</ColorText>
                                                </Box>
                                                <Divider />
                                                <Box p={1} >
                                                    <ColorText>{task?.name}</ColorText>
                                                </Box>
                                            </TaskBox>
                                        )
                                    }
                                }) :
                                <CircularProgress />
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.alignBetween} m={2} mt={5} >
                        <ContainedBtn
                            endIcon={<ArrowBackIcon />}
                            title="Back"
                            disabled={addTaskDependencyLoading}
                            onClick={() => setIsContinue(false)}
                        />
                        <ContainedBtn
                            endIcon={!addTaskDependencyLoading && <DoneIcon />}
                            title={addTaskDependencyLoading ? <CircularProgress /> : "Add Dependency"}
                            disabled={addTaskDependencyLoading || !(parentTask.length > 0 && selectedTask.trim().length === 24)  }
                            onClick={() => {
                                if (parentTask.length > 0 && selectedTask.trim().length === 24) {
                                    setAddTaskDependencyLoading(true)
                                    addTaskDependency(selectedTask, parentTask).then(res => {
                                        if (res) {
                                            setSelectedTask('')
                                            setParentTask([])
                                            navigate(`/project/${id}/taskDependency`)
                                            setAddTaskDependencyLoading(false)
                                        }
                                        setAddTaskDependencyLoading(false)
                                    })
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    currentUser: store.user.user,
    projectTasks: store.task.tasks,
    reduxTaskLoading: store.task.loading,
});


const mapDispatchToProps = (dispatch) => ({
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    addTaskDependency: (taskId, taskRefs) => dispatch(addTaskDependency(taskId, taskRefs))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskDependency);