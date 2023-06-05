import React, { useState } from 'react';
import { makeStyles, } from "@mui/styles";
import {
    Box, Typography, IconButton, Button, CircularProgress, OutlinedInput, Tooltip,
    Accordion, AccordionSummary, AccordionDetails, Divider
} from "@mui/material";
import { styled, } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { setTaskDelete, updateTaskAgileCycle, updateTaskDescription, updateTaskDeadLine } from '../../../Redux/Task/TaskAction';
import './Model.css'
import EditIcon from '@mui/icons-material/Edit';
import FullScreenDialog from '../../../Components/Dialog';
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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
        // cursor: 'pointer'
    },
    alignEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    IconButton: {
        backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
        border: ' 2px solid #FFFFFF !important',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '50px'
    },
    productInput: {
        marginTop: "10px",
        maxWidth: "100%",
        height: "auto",
        borderRadius: "10px",
    },
    dFlex: {
        display: 'flex'
    },
    loadingBtn: {
        margin: '5px 0px !important',
        backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1)) !important',
        color: 'white !important',
        height: '50px !important',
        marginLeft: '20px !important',
        marginTop: '40px !important'
    }
}));
const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    // minHeight: '100vh',
}));

const SpaceBetweenBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const BoxDisplayForState = ({ stateName, currentState, }) => {
    const classes = useStyles();
    return (
        <Box className={classes.dFlex} my={1} >
            <Typography variant='h6' sx={{ color: '#21268C', mr: 1 }} >{stateName} :  </Typography>
            <Typography variant='h6' > {currentState}</Typography>
        </Box>
    )
}


const Model = ({
    modelHeading,
    tasks,
    currentUser,
    setTaskDelete,
    projectId,
    updateTaskAgileCycle,
    index,
    uid,
    updateTaskDescription,
    key,
    updateTaskDeadLine
}) => {
    const classes = useStyles();
    const agileCycleArr = ['Requirments', 'Design', 'Develop', 'Test', 'Deploy', 'Maintenance']




    const [isTaskDetailDialogOpen, setIsTaskDetailDialogOpen] = useState(false)
    const [isCreateIssueEditedDialogOpen, setIsCreateIssueEditedDialogOpen] = useState(false)
    const [taskEditLoading, settaskEditLoading] = useState(false)
    const [extendTaskLoading, setExtendTaskLoading] = useState(false)
    const [deadlineExtend, setDeadlineExtend] = useState('')
    const [editTaskCredentials, setEditTaskCredentials] = useState({
        name: "",
        description: "",
    })
    const [taskId, setTaskId] = useState('')
    const [taskDetails, setTaskDetails] = useState({})

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    // console.log(tomorrow,"tomorrow")
    // console.log(moment('2023-06-09T15:07:55.075Z').format("DD/MM/YYYY"),"check min date")

    const isDateDifferent = (DateOne, DateTwo) => {
        if (!DateOne || !DateTwo) {
            return false
        }
        const formattedDate1 = dayjs(DateOne).format('YYYY-MM-DD');
        const formattedDate2 = dayjs(DateTwo).format('YYYY-MM-DD');
        if (formattedDate1 === formattedDate2) {
            return false
        }
        return true
    }

    const projectEditTask = () => {
        // console.log('chala projectEditTask')
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

    const ExtendTaskDeadline = () => {
        // console.log('chala projectEditTask')
        setExtendTaskLoading(true)
        if (!deadlineExtend
        ) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Working Days",
                html: `<strong><font color="black">Please Select Deadline Date First </font></strong>`,
            });
            setExtendTaskLoading(false)

        }
        else {

            updateTaskDeadLine({
                deadlineExtend: deadlineExtend
            },
                taskId,
                projectId
            ).then((res) => {
                setDeadlineExtend('')
                setExtendTaskLoading(false)
                setIsTaskDetailDialogOpen(false)
                setTaskId('')
            })
        }
    }

    return (
        <>
            <Box className={classes.mainCntnr} mr={4} key={key} >
                <Box p={2} mb={4} className={classes.headCntnr} >
                    <ColorText className={classes.mainHead} >{modelHeading} </ColorText>
                </Box>
                <Box p={1} mt={4} className={[classes.tasksCntnr, 'example']} >
                    {
                        tasks?.length > 0 &&
                        tasks.map((task, ind) => {
                            return (
                                <Box p={1} mb={1}
                                    className={classes.task}
                                    key={ind}

                                >
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
                                    }} > {task?.createdBy?.name} </ColorText> </ColorText>}
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
                                            {modelHeading !== "Requirments" && <Tooltip title="Update Task Status"><IconButton sx={{ color: '#0096FF' }} aria-label="move Forward" component="label"
                                                onClick={() => {
                                                    updateTaskAgileCycle({
                                                        agileCycle: agileCycleArr[index - 1],
                                                        employee: uid
                                                    }, task._id, projectId)
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            </Tooltip>}
                                            {modelHeading !== "Maintenance" && <Tooltip title="Update Task Status"><IconButton sx={{ color: '#0096FF' }} aria-label="move Backward" component="label"
                                                onClick={() => {
                                                    updateTaskAgileCycle({
                                                        agileCycle: agileCycleArr[index + 1],
                                                        employee: uid
                                                    }, task._id, projectId)
                                                }}
                                            >
                                                <ArrowForwardIcon />
                                            </IconButton>
                                            </Tooltip>}

                                        </>}
                                        {
                                            ([0, 1, 2, 3].includes(currentUser?.level) && (currentUser?.level < task?.employee?.level  ) )&& 
                                            <Tooltip title="Delete Task">
                                                <IconButton color="error" aria-label="Delete Task" component="label"
                                                    onClick={() => setTaskDelete(task._id, projectId)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        {
                                            ([0, 1, 2, 3].includes(currentUser?.level) && (currentUser?.level < task?.employee?.level  ) )&& <Tooltip title="Edit Task">
                                                <IconButton sx={{ color: '#0096FF' }} aria-label="Edit Task" component="label"
                                                    onClick={() => {
                                                        setTaskId(`${task._id}`)
                                                        setEditTaskCredentials({
                                                            name: currentUser?.level?.name,
                                                            description: task?.description
                                                        })
                                                        setIsCreateIssueEditedDialogOpen(true)
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        {([0, 1, 2, 3].includes(currentUser?.level) && (currentUser?.level < task?.employee?.level  ) )&&  <Tooltip title="Task Details">
                                            <IconButton sx={{ color: '#0096FF' }} aria-label="Task Details" component="label"
                                                onClick={() => {
                                                    setTaskId(`${task._id}`)
                                                    setTaskDetails({ ...task })
                                                    setIsTaskDetailDialogOpen(true)
                                                }}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>}

                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isCreateIssueEditedDialogOpen} hideDialogHandler={() => {
                setIsCreateIssueEditedDialogOpen(false)
                setTaskId('')
            }}>
                <ColorBox p={2} >
                    <Box my={2} >
                        <Box>
                            <Box className={classes.alignEnd} >
                                <IconButton aria-label="Close" onClick={() => {
                                    setIsCreateIssueEditedDialogOpen(false)
                                    setTaskId('')
                                }}>
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
                                style={{ margin: '5px 0px', backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))', color: 'white' }}
                                endIcon={<EditIcon sx={{ color: 'white' }} />}
                                onClick={projectEditTask}
                            >
                                {taskEditLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Edit task'}
                            </Button>
                        </Box>
                    </Box>
                </ColorBox>
            </FullScreenDialog>
            {/* Dialog For Task Details */}
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isTaskDetailDialogOpen}
                hideDialogHandler={() => {
                    setIsTaskDetailDialogOpen(false)
                    setTaskDetails({})
                    setDeadlineExtend('')
                    setTaskId('')
                }}
            >
                <ColorBox p={2} >
                    <Box>
                        <Box className={classes.alignEnd} >
                            <IconButton aria-label="Close"
                                onClick={() => {
                                    setIsTaskDetailDialogOpen(false)
                                    setTaskDetails({})
                                    setDeadlineExtend('')
                                    setTaskId('')
                                }}
                                className={classes.IconButton} >
                                <ColorText>
                                    <CloseIcon fontSize='large' sx={{ color: '#FFFFFF', pt: 1 }} />
                                </ColorText>
                            </IconButton>
                        </Box>
                        <ColorText variant='h4' style={{ fontWeight: 'bold' }} >{taskDetails?.name}   </ColorText>
                    </Box>
                </ColorBox>
                <Divider sx={{ height: '2px', backgroundColor: '#21268C' }} />
                <ColorBox p={2} >
                    <Box my={2} style={{ width: "auto" }}>
                        <Typography style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '17px' }}>
                            Description
                        </Typography>
                        <OutlinedInput
                            fullwidth
                            maxRows={10}
                            multiline={true}
                            required={true}
                            className={classes.productInput}
                            style={{ width: "100%" }}
                            readOnly={true}
                            type="text"
                            value={taskDetails?.description}
                        />
                    </Box>
                    <Box>
                        <SpaceBetweenBox>
                            <BoxDisplayForState stateName='Assign To' currentState={taskDetails?.employee?.name} />
                            {taskDetails?.createdBy && <BoxDisplayForState stateName='Assign By' currentState={taskDetails?.createdBy?.name} />}
                        </SpaceBetweenBox>
                        <SpaceBetweenBox>
                            <BoxDisplayForState stateName='Deadline Start' currentState={moment(taskDetails?.deadlineStart).format("DD/MM/YYYY")} />
                            <BoxDisplayForState stateName='Deadline End' currentState={moment(taskDetails?.deadlineEnd).format("DD/MM/YYYY")} />
                        </SpaceBetweenBox>
                        <SpaceBetweenBox>
                            <BoxDisplayForState stateName='Assing At' currentState={moment(taskDetails?.createdAt).format("DD/MM/YYYY")} />
                            {taskDetails?.deadlineExtend && <BoxDisplayForState stateName='Extended DeadLine' currentState={moment(taskDetails?.deadlineExtend).format("DD/MM/YYYY")} />}
                        </SpaceBetweenBox>
                    </Box>
                    <Box className={classes.dFlex} >
                        <Box sx={{ border: '1px solid #21268C', px: 2, py: 1, borderRadius: '5px' }} >
                            <Typography variant='h6' sx={{ color: '#21268C', mr: 1 }}  >Extend Deadline</Typography>
                            <SpaceBetweenBox>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DemoItem label="DatePicker">
                                            <DatePicker
                                                defaultValue={tomorrow}
                                                minDate={dayjs(taskDetails?.deadlineEnd).add(1, 'day')}
                                                views={['year', 'month', 'day']}
                                                onChange={(e) => {
                                                    // console.log(e.$d, "DatePicker")
                                                    setDeadlineExtend(e.$d ? e.$d : '')
                                                }}
                                            />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                                {(!taskDetails?.deadlineExtend || isDateDifferent(deadlineExtend, taskDetails?.deadlineExtend)) && <Button type='submit' variant="contained"
                                    disabled={extendTaskLoading}
                                    className={classes.loadingBtn}
                                    endIcon={<EditIcon sx={{ color: 'white' }} />}
                                    onClick={ExtendTaskDeadline}
                                >
                                    {extendTaskLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Extend Deadline'}
                                </Button>}
                            </SpaceBetweenBox>
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
    updateTaskDescription: (data, taskId, projectId) => dispatch(updateTaskDescription(data, taskId, projectId)),
    updateTaskDeadLine: (data, taskId, projectId) => dispatch(updateTaskDeadLine(data, taskId, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Model);