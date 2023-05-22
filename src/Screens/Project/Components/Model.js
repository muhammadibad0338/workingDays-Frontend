import React, { useState } from 'react';
import { makeStyles, } from "@mui/styles";
import {
    Box, Typography, IconButton, Button, CircularProgress, OutlinedInput
} from "@mui/material";
import { styled, } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { setTaskDelete, updateTaskAgileCycle, updateTaskDescription } from '../../../Redux/Task/TaskAction';
import './Model.css'
import EditIcon from '@mui/icons-material/Edit';
import FullScreenDialog from '../../../Components/Dialog';
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';

import moment from 'moment/moment';

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

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // minHeight: '100vh',
}));

const Model = ({ modelHeading, tasks, currentUser, setTaskDelete, projectId, updateTaskAgileCycle, index, uid, updateTaskDescription }) => {
    const classes = useStyles();
    const agileCycleArr = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']



    const [isCreateIssueEditedDialogOpen, setIsCreateIssueEditedDialogOpen] = useState(false)
    const [taskEditLoading, settaskEditLoading] = useState(false)
    const [editTaskCredentials, setEditTaskCredentials] = useState({
        name: "",
        description: "",
    })
    const [taskId, setTaskId] = useState('')


    const projectEditTask = () => {
        console.log('chala projectEditTask')
        settaskEditLoading(true)
        if (editTaskCredentials.description.trim().length == 0 ||
            editTaskCredentials.name.trim().length == 0 ||
            taskId.trim().length == 0
        ) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Working Days",
                html: `<strong><font color="black">Please fill all Fields </font></strong>`,
            });
            settaskEditLoading(false)

        }
        else {

            updateTaskDescription({
                name: editTaskCredentials.name,
                description: editTaskCredentials.description,
                softwareCompany: uid
            },
                taskId,
                projectId
            ).then((res) => {
                setEditTaskCredentials({
                    name: "",
                    description: ""
                })
                settaskEditLoading(false)
                setIsCreateIssueEditedDialogOpen(false)
                setTaskId('')
                setEditTaskCredentials({
                    name: "",
                    description: "",
                })
            })
        }
    }

    return (
        <>
            <Box className={classes.mainCntnr} mr={4} >
                <Box p={2} mb={4} className={classes.headCntnr} >
                    <ColorText className={classes.mainHead} >{modelHeading} </ColorText>
                </Box>
                <Box p={1} mt={4} className={[classes.tasksCntnr, 'example']} >
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
                                    {task?.softwareCompany && <ColorText style={{ display: 'flex' }} > Assign By : <ColorText sx={{
                                        textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }} > {task?.softwareCompany?.name} </ColorText> </ColorText>}
                                    {task?.deadlineStart && <ColorText style={{ display: 'flex' }} > Deadline Start : <ColorText sx={{
                                        textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }} > {moment(task?.deadlineStart).format("DD/MM/YYYY")} </ColorText> </ColorText>}
                                    {task?.deadlineEnd && <ColorText style={{ display: 'flex' }} > Deadline End : <ColorText sx={{
                                        textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }} > {moment(task?.deadlineEnd).format("DD/MM/YYYY")} </ColorText> </ColorText>}
                                    {task?.createdAt && <ColorText style={{ display: 'flex' }} > Assign At : <ColorText sx={{
                                        textTransform: 'capitalize', whiteSpace: 'break-spaces', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }} > {moment(task?.createdAt).format("DD/MM/YYYY")} </ColorText> </ColorText>}
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
                                        {
                                            currentUser.role === "softwareCompany" && <IconButton sx={{ color: '#0096FF' }} aria-label="Edit Task" component="label"
                                                onClick={() => {
                                                    setTaskId(`${task._id}`)
                                                    setEditTaskCredentials({
                                                        name: task?.name,
                                                        description: task?.description
                                                    })
                                                    setIsCreateIssueEditedDialogOpen(true)
                                                }}
                                            >
                                                <EditIcon />
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
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isCreateIssueEditedDialogOpen} hideDialogHandler={() => setIsCreateIssueEditedDialogOpen(false)} >
                <ColorBox p={2} >
                    <Box my={2} >
                        <Box>
                            <Box className={classes.alignEnd} >
                                <IconButton aria-label="Close" onClick={() => setIsCreateIssueEditedDialogOpen(false)} >
                                    <ColorText>
                                        <CloseIcon />
                                    </ColorText>
                                </IconButton>
                            </Box>
                            <ColorText variant='h6' style={{ fontWeight: 'bold' }} >Edited a Issue  </ColorText>
                        </Box>

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
                                value={editTaskCredentials.name}
                                onChange={(e) => {
                                    setEditTaskCredentials({
                                        ...editTaskCredentials,
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
                                value={editTaskCredentials.description}
                                onChange={(e) => {
                                    setEditTaskCredentials({
                                        ...editTaskCredentials,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </Box>
                        <Box mt={3} >
                            {/* <ContainedBtn title="create task" endIcon={<AddIcon />} onClick={projectCreateTask} disabled={taskCreateLoading} /> */}
                            <Button type='submit' disabled={taskEditLoading} variant="contained"
                                style={{ margin: '5px 0px', backgroundColor: '#0096FF' }}
                                endIcon={<EditIcon />}
                                onClick={projectEditTask}
                            >
                                {taskEditLoading ? <CircularProgress /> : 'Edit task'}
                            </Button>
                        </Box>
                    </Box>
                </ColorBox>
            </FullScreenDialog>
        </>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    currentUser: store.user.user,
});


const mapDispatchToProps = (dispatch) => ({
    setTaskDelete: (taskId, projectId) => dispatch(setTaskDelete(taskId, projectId)),
    updateTaskAgileCycle: (data, taskId, projectId) => dispatch(updateTaskAgileCycle(data, taskId, projectId)),
    updateTaskDescription: (data, taskId, projectId) => dispatch(updateTaskDescription(data, taskId, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Model);