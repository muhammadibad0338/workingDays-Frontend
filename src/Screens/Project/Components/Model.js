import React from 'react';
import { makeStyles, } from "@mui/styles";
import {
    Box, Typography, IconButton
} from "@mui/material";
import { styled, } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { setTaskDelete, updateTaskAgileCycle } from '../../../Redux/Task/TaskAction';
import './Model.css'

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
        // backgroundColor: '#EBECF0',
        backgroundColor: theme.palette.ticketBox.main,
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
    },
    mainHead: {
        // color: '#5E6C84',
        textTransform: 'uppercase',
    },
    tasksCntnr: {
        // width: 'fit-content',
        width: '293px',
        minHeight: '300px',
        // height: 'auto',
        maxHeight: '200px',
        overflowY: 'overlay',
        // backgroundColor: '#EBECF0',
        backgroundColor: theme.palette.ticketBox.main,
        borderRadius: '6px'
    },
    task: {
        backgroundColor: theme.palette.primary.main,
        // width:'100%',
        width: '270px',
        minHeight: '80px',
        borderRadius: '6px',
        boxShadow: '1px 1px rgba(23,43,77,0.2),0 0 1px rgba(23,43,77,0.2)',
        border: theme.palette.type == "light" ? 'none' : '1px solid #0095FF',
    }
}));
const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));


const Model = ({ modelHeading, tasks, currentUser, setTaskDelete, projectId, updateTaskAgileCycle, index, uid }) => {
    const classes = useStyles();
    const agileCycleArr = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']


    
    return (
        <Box className={classes.mainCntnr} mr={4} >
            <Box p={2} mb={4} className={classes.headCntnr} >
                <ColorText className={classes.mainHead} >{modelHeading} </ColorText>
            </Box>
            <Box p={1} mt={4} className={[classes.tasksCntnr,'example']} >
                {/* <Box p={1} mb={1} className={classes.task} ></Box> */}
                {
                    tasks.length > 0 &&
                    tasks.map((task, ind) => {
                        return (
                            <Box p={1} mb={1} className={classes.task} key={ind} >
                                <ColorText sx={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '17px' }} >{task?.name}</ColorText>
                                <hr style={{ margin: '5px 0px', opacity: '0.5' }} />
                                <ColorText sx={{
                                    textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                }} >{task?.description}</ColorText>
                                <hr style={{ margin: '20px 0px 10px 0px', opacity: '0.5' }} />
                                {task?.employee && <ColorText style={{ display: 'flex' }} > Assign To : <ColorText sx={{
                                    textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                }} > {task?.employee?.name} </ColorText> </ColorText>}
                                <Box>
                                    {(task?.employee?._id == uid || currentUser.role === "softwareCompany") && <>
                                        {modelHeading !== "Requirments" && <IconButton sx={{ color: '#0096FF' }} aria-label="move Forward" component="label"
                                            onClick={() => {
                                                updateTaskAgileCycle({
                                                    agileCycle: agileCycleArr[index - 1],
                                                    employee: uid
                                                }, task._id, projectId)
                                            }}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>}
                                        {modelHeading !== "Maintenance" && <IconButton sx={{ color: '#0096FF' }} aria-label="move Backward" component="label"
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