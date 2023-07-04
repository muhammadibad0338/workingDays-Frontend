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


import { getProjectsTasks, addTaskDependency, editTaskDependency } from '../../../Redux/Task/TaskAction';
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
        backgroundColor: '#EAEDF0',
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
    backgroundColor: '#FFFFFF !important',
    cursor: 'pointer',
    // boxShadow: isSelected ? 'rgb(213, 215, 219) 0px 7px 29px 0px' : '',
}));




const EditTaskDependency = ({ projectTasks, getProjectsTasks, reduxTaskLoading, getProjectDetails, addTaskDependency, editTaskDependency }) => {
    let { id } = useParams();
    const classes = useStyles();
    const navigate = useNavigate()
    const [level, setLevel] = useState('First')
    const [DependentTask, setDependentTask] = useState('')
    const [replacingParent, setReplacingParent] = useState('')  //jis ko replace kia jaraha ha
    const [replacedParent, setReplacedParent] = useState('') //jis se replace kia jarah ha

    const [DpendUpon, setDpendUpon] = useState([])

    const [editTaskDependencyLoading, setEditTaskDependencyLoading] = useState(false)


    useEffect(() => {
        // console.log(projectTasks?.length ,"projectTasks?.length ")
        // if (projectTasks?.length === 0) {
        getProjectsTasks(id)
        getProjectDetails(id)
        // }
    }, [])

    const findDependUponByTaskId = (taskId) => {
        let Task = projectTasks.filter(task => task._id === taskId)
        setDpendUpon(Task[0]?.dependUpon || [])
        console.log(Task[0]?.dependUpon || [], "findDependUponByTaskId")
    }

    const findTaskInDependUpon = (taskId) => {
        const existsInDependUpon = DpendUpon.some(item => item._id === taskId);
        return existsInDependUpon;
    };

    return (
        <>
            <div className={classes.dashboardImg} >
                {/* First Level Selecting Dependent/Children Task  */}
                {
                    level === 'First' &&
                    <Grid container >
                        <Grid item xs={12} my={2} ml={3} >
                            <HeadingOne sx={{ color: 'white' }} title="Edit Task Dependency" />
                            <HeadingOne btmText="Select a Dependent/Children task which ParentTasks you want to replace" />
                        </Grid>
                        <Grid item xs={12} className={classes.alignEnd} m={2} >
                            <ContainedBtn
                                endIcon={<ArrowForwardIcon />}
                                disabled={DependentTask.trim().length === 24 ? false : true}
                                sx={{ border: '3px solid white' }}
                                title="Continue"
                                onClick={() => setLevel('Second')}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.TaskContainer}   >
                            {
                                (!reduxTaskLoading || projectTasks?.length > 0) ?
                                    projectTasks?.map((task, ind) => {
                                        return (
                                            <TaskBox key={ind} m={2}
                                                onClick={() => {
                                                    setDependentTask(task._id)
                                                    findDependUponByTaskId(task._id)
                                                }}
                                                isSelected={DependentTask === task._id ? true : false}
                                            >
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center', }} style={{ fontWeight: 'bold' }} >{task?._id}</ColorText>
                                                </Box>
                                                <Divider />
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center', }}>{task?.name}</ColorText>
                                                </Box>
                                            </TaskBox>
                                        )
                                    }) :
                                    <CircularProgress />
                            }
                        </Grid>
                    </Grid>
                }

                {/* Second Level jis Parent ko replace krna ha */}
                {
                    level === 'Second' &&
                    <Grid container >
                        <Grid item xs={12} my={2} ml={3} >
                            <HeadingOne sx={{ color: 'white' }} title="Edit Task Dependency" />
                            <HeadingOne btmText="Select a Parant task which is Going to replace" />
                        </Grid>
                        <Grid item xs={12} className={classes.alignBetween} m={2} >
                            <ContainedBtn
                                endIcon={<ArrowBackIcon />}
                                title="Back"
                                // disabled={addTaskDependencyLoading}
                                onClick={() => {
                                    setLevel('First')
                                    setReplacingParent('')
                                }}
                            />
                            <ContainedBtn
                                endIcon={<ArrowForwardIcon />}
                                disabled={replacingParent.trim().length === 24 ? false : true}
                                sx={{ border: '3px solid white' }}
                                title="Continue"
                                onClick={() => setLevel('Third')}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.TaskContainer}   >
                            {
                                (DpendUpon?.length > 0) ?
                                    DpendUpon?.map((task, ind) => {
                                        return (
                                            <TaskBox key={ind} m={2}
                                                onClick={() => {
                                                    setReplacingParent(task._id)
                                                    // findDependUponByTaskId(task._id)
                                                }}
                                                isSelected={replacingParent === task._id ? true : false}
                                            >
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center', }} style={{ fontWeight: 'bold' }} >{task?._id}</ColorText>
                                                </Box>
                                                <Divider />
                                                <Box p={1} >
                                                    <ColorText sx={{ textAlign: 'center', }}>{task?.name}</ColorText>
                                                </Box>
                                            </TaskBox>
                                        )
                                    }) :
                                    <ColorText sx={{ textAlign: 'center', }} style={{ fontWeight: 'bold' }}  >No Parent Task</ColorText>
                            }
                        </Grid>
                    </Grid>
                }

                {/* Third Level jis Parent se replace krna ha */}

                {
                    level === 'Third' &&
                    <Grid container  >
                        <Grid item xs={12} my={2} ml={3} >
                            <HeadingOne sx={{ color: 'white' }} title="Edit Task Dependency" />
                            <HeadingOne btmText="Select a New Parant task which is Going to replaced" />
                        </Grid>
                        <Grid item xs={12} className={classes.alignBetween} m={2} >
                            <ContainedBtn
                                endIcon={<ArrowBackIcon />}
                                title="Back"
                                disabled={editTaskDependencyLoading}
                                onClick={() => {
                                    setLevel('Second')
                                    setReplacedParent('')
                                }}
                            />
                            <ContainedBtn
                                endIcon={<ArrowForwardIcon />}
                                disabled={editTaskDependencyLoading ||
                                    replacedParent.trim().length !== 24 || replacingParent.trim().length !== 24 || DependentTask.trim().length !== 24}
                                sx={{ border: '3px solid white' }}
                                title="Edit Task Dependency"
                                onClick={() => {
                                    if (replacedParent.trim().length === 24 || replacingParent.trim().length === 24 || DependentTask.trim().length === 24) {
                                        setEditTaskDependencyLoading(true)
                                        editTaskDependency(DependentTask, replacingParent, replacedParent).then(res => {
                                            if (res) {
                                                setDependentTask('')
                                                setReplacedParent('')
                                                setReplacingParent('')
                                                navigate(`/project/${id}/taskDependency`)
                                                setEditTaskDependencyLoading(false)
                                            }
                                            setEditTaskDependencyLoading(false)
                                        })
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.TaskContainer} mt={0} >
                            {
                                (!reduxTaskLoading || projectTasks?.length > 0) ?
                                    projectTasks?.map((task, ind) => {
                                        if ((DependentTask !== task._id) && !findTaskInDependUpon(task._id)) {
                                            return (
                                                <TaskBox key={ind} m={2}
                                                    onClick={() => setReplacedParent(task._id)}
                                                    isSelected={replacedParent === task._id ? true : false}
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
    editTaskDependency: (taskId, replaceFromTaskRefs, replaceToTaskRefs) => dispatch(editTaskDependency(taskId, replaceFromTaskRefs, replaceToTaskRefs))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskDependency);