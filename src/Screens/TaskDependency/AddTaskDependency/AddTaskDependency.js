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
import dashboardBg from "../../../Assets/Images/dashboardBg.jpg"
import HeadingOne from '../../../Components/HeadingOne';

const useStyles = makeStyles((theme) => ({
    TaskContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // marginTop : '100px !important'
        backgroundColor:'#EAEDF0',
    },
    alignEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        // position:'absolute',
        // right:'10px',
        // bottom:'470px',
        // [theme.breakpoints.down('850')]: {
        //     right:'12px',
        //     bottom:'400px',
            
        //   },
        //   [theme.breakpoints.down('625')]: {
        //     right:'3px',
        //     bottom:'500px',
        //   },
        //   [theme.breakpoints.down('600')]: {
        //     right:'1px',
        //   },
    },
    alignBetween: {
        display: 'flex',
        justifyContent: 'space-between',

    }, 
    dashboardImg:
    {
        width: '100%',
        // minHeight: '100vh !important',
        height: '180px !important',
        backgroundImage: `url(${dashboardBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px 10px 10px 10px !important',
        
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
    outline: isSelected ? '4px solid #0095FF' : "",
    backgroundColor:'#FFFFFF !important',
    cursor: 'pointer',
    // boxShadow: isSelected ? 'rgb(213, 215, 219) 0px 7px 29px 0px' : '',
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
        // console.log(projectTasks?.length ,"projectTasks?.length ")
        // if (projectTasks?.length === 0) {
            getProjectsTasks(id)
            getProjectDetails(id)
        // }
    }, [])


    return (
        <>
            <div className={classes.dashboardImg}>
                {!isContinue ?
                    <Grid container  >
                        <Grid item xs={12} my={2} ml={3} >
                            {/* <ColorText variant='h4' sx={{ textAlign: 'center' }} >Select a Task which you want to make DEPENDENT</ColorText> */}
                            <HeadingOne sx={{color:'white'}} title="Add Task Dependency"  />
                            <HeadingOne btmText="Select a task which you want to make DEPENDENT"  />
                        
                        </Grid>
                         <Grid item xs={12} className={classes.alignEnd} m={2} >
                            <ContainedBtn
                                endIcon={<ArrowForwardIcon />}
                                disabled={selectedTask.trim().length === 24 ? false : true}
                                sx={{border:'3px solid white'}}
                                title="Continue"
                                onClick={() => setIsContinue(true)}
                            />
                        </Grid>
                        
                        <Grid item xs={12} className={classes.TaskContainer}   >
                            {
                                (!reduxTaskLoading || projectTasks?.lenght > 0) ?
                                    projectTasks?.map((task, ind) => {
                                        return (
                                            <TaskBox key={ind} m={2}
                                                onClick={() => setSelectedTask(task._id)}
                                                isSelected={selectedTask === task._id ? true : false}
                                            >
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center',}} style={{fontWeight:'bold'}} >{task?._id}</ColorText>
                                                </Box>
                                                <Divider />
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center',}}>{task?.name}</ColorText>
                                                </Box>
                                            </TaskBox>
                                        )
                                    }) :
                                    <CircularProgress />
                            }
                        </Grid>
                        {/* <Grid item xs={12} className={classes.alignEnd} m={2} >
                            <ContainedBtn
                                endIcon={<ArrowForwardIcon />}
                                disabled={selectedTask.trim().length === 24 ? false : true}
                                sx={{border:'3px solid white'}}
                                title="Continue"
                                onClick={() => setIsContinue(true)}
                            />
                        </Grid> */}
                    </Grid>
                    :
                    <Grid container >
                        <Grid item xs={12} my={2} >
                            {/* <ColorText variant='h4' sx={{ textAlign: 'center' }} >Now Selects  Parent Tasks</ColorText> */}
                            <HeadingOne sx={{color:'white'}} title="Parent Tasks" ml={2} />
                            <HeadingOne btmText="Now Selects  Parent Tasks" ml={2} />
                        </Grid>
                        <Grid item xs={12} className={classes.TaskContainer} mt={10} >
                            {
                                (!reduxTaskLoading || projectTasks?.length > 0) ?
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
                                disabled={addTaskDependencyLoading || !(parentTask.length > 0 && selectedTask.trim().length === 24)}
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
            </div>
        </>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    currentUser: store.user.user,
    projectTasks: store.task.tasks.tasks,
    reduxTaskLoading: store.task.loading,
});


const mapDispatchToProps = (dispatch) => ({
    getProjectsTasks: (id) => dispatch(getProjectsTasks(id)),
    getProjectDetails: (id) => dispatch(getProjectDetails(id)),
    addTaskDependency: (taskId, taskRefs) => dispatch(addTaskDependency(taskId, taskRefs))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskDependency);