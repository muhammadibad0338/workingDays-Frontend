import React from 'react';
import { makeStyles, withStyles } from "@mui/styles";
import {
    Box, Typography, IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { setTaskDelete, updateTaskAgileCycle } from '../../../Redux/Task/TaskAction';


const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
    },
    mainHead: {
        textTransform: 'uppercase',
        margin: '20px 0px !important'
    },
    mainCntnr: {
        // width: '270px'
    },
    headCntnr: {
        width: '270px',
        // height: '40px',
        backgroundColor: '#EBECF0',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
    },
    mainHead: {
        color: '#5E6C84',
        textTransform: 'uppercase',
    },
    tasksCntnr: {
        // width: 'fit-content',
        width: '290px',
        minHeight: '300px',
        height: 'auto',
        backgroundColor: '#EBECF0',
        borderRadius: '6px'
    },
    task: {
        backgroundColor: 'white',
        // width:'100%',
        width: '270px',
        minHeight: '80px',
        borderRadius: '6px',
        boxShadow: '1px 1px rgba(23,43,77,0.2),0 0 1px rgba(23,43,77,0.2)'
    }
}));


const Model = ({ modelHeading, tasks, currentUser, setTaskDelete, projectId, updateTaskAgileCycle, index, uid }) => {
    const classes = useStyles();
    const agileCycleArr = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']



    return (
        <Box className={classes.mainCntnr} mr={4} >
            <Box p={2} mb={4} className={classes.headCntnr} >
                <Typography className={classes.mainHead} >{modelHeading} </Typography>
            </Box>
            <Box p={1} mt={4} className={classes.tasksCntnr} >
                {/* <Box p={1} mb={1} className={classes.task} ></Box> */}
                {
                    tasks.length > 0 &&
                    tasks.map((task, ind) => {
                        return (
                            <Box p={1} mb={1} className={classes.task} key={ind} >
                                <Typography sx={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '17px' }} >{task?.name}</Typography>
                                <hr style={{ margin: '5px 0px', opacity: '0.5' }} />
                                <Typography sx={{
                                    textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                }} >{task?.description}</Typography>
                                <hr style={{ margin: '20px 0px 10px 0px', opacity: '0.5' }} />
                                {task?.employee && <p style={{ display: 'flex' }} > Assign To : <Typography sx={{
                                    textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                }} > {task?.employee?.name} </Typography> </p>}
                                <Box>
                                    {(task?.employee?._id == uid || currentUser.role === "softwareCompany" ) &&  <>
                                        {modelHeading !== "Requirments" && <IconButton color="primary" aria-label="move Forward" component="label"
                                            onClick={() => {
                                                updateTaskAgileCycle({
                                                    agileCycle: agileCycleArr[index - 1],
                                                    employee: uid
                                                }, task._id, projectId)
                                            }}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>}
                                        {modelHeading !== "Maintenance" && <IconButton color="primary" aria-label="move Backward" component="label"
                                            onClick={() => {
                                                updateTaskAgileCycle({
                                                    agileCycle: agileCycleArr[index + 1],
                                                    employee: uid
                                                }, task._id, projectId)
                                            }}
                                        >
                                            <ArrowForwardIcon />
                                        </IconButton>}
                                    </>}
                                    {
                                        currentUser.role === "softwareCompany" && <IconButton color="error" aria-label="Delete Task" component="label"
                                            onClick={() => setTaskDelete(task._id, projectId)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }

                                </Box>
                                {/* {currentUser.role === "softwareCompany" && <Box> </Box>} */}
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    currentUser: store.user.user,
});


const mapDispatchToProps = (dispatch) => ({
    setTaskDelete: (taskId, projectId) => dispatch(setTaskDelete(taskId, projectId)),
    updateTaskAgileCycle: (data, taskId, projectId) => dispatch(updateTaskAgileCycle(data, taskId, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Model);