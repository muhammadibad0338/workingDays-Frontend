import React from 'react'
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles, withStyles } from "@mui/styles";
import { useNavigate, useParams } from 'react-router-dom';
import ContainedBtn from '../../Components/ContainedBtn';
import dashboardBg from "../../Assets/Images/dashboardBg.jpg"
import HeadingOne from '../../Components/HeadingOne';
import AddIcon from '@mui/icons-material/Add';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { borderRadius } from '@mui/system';

import TaskDependencyBtn from '../../Components/TaskDependencyBtn'

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const useStyles = makeStyles((theme) => ({
    dashboardImg:
    {
        width: '100%',
        // minHeight: '100vh !important',
        height: '160px !important',
        backgroundImage: `url(${dashboardBg})`,
        // background:'#f1f1f1 url(${dashboardBg}) ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px 10px 10px 10px !important',
    },
    taskCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        margin : theme.spacing(3),

        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
        },
        
    },

    backSet: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '3px solid #4A4BE3',
        textAlign: 'center',
        lineHeight: '100px',
        verticalAlign: 'middle',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 20,
            textAlign:'center'
          },

    },
    depIcon: {
        fontSize: '50px !important',
        color: '#4A4BE3 !important',
        verticalAlign: 'middle',
        textAlign:'center', 
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          marginBottom: 0,
        },
    },
    taskText:
    {   
        color: '#7A7A7A',
        [theme.breakpoints.down('sm')]: {
            marginTop: '40px',
          },

    }
}))

const ActionCard = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const classes = useStyles();

    return (
        <Grid container spacing={1} justify="center"    >
            <Grid item xs={12} sm={6} md={4}  >

                <Card className={classes.taskCard}    >
                    <div className={classes.backSet}>
                        <AddIcon className={classes.depIcon} />
                    </div>
                   
                   <div >
                    <Typography mb={1} ml={4} className={classes.taskText}>Add Task</Typography>
                    <TaskDependencyBtn title='Add'  onClick={() => navigate(`/project/${id}/taskDependency/addTaskDependency`)} />
                    </div>
                </Card>
            </Grid>


            <Grid item xs={12} sm={6} md={4}     >
                <Card className={classes.taskCard}  >
                    <div className={classes.backSet}>
                        <EditSharpIcon className={classes.depIcon} />
                    </div>
                    <div >
                    <Typography mb={1}  ml={4} className={classes.taskText}>Edit Task</Typography>
                    <TaskDependencyBtn title='Edit'  onClick={() => navigate(`/project/${id}/taskDependency/editTaskDependency`)} />
                    </div>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}     >
                <Card className={classes.taskCard}  >
                    <div className={classes.backSet}>
                        <DeleteSharpIcon className={classes.depIcon} />
                    </div>
                   <div>
                    <Typography mb={1}  ml={4} className={classes.taskText}>Delete Task</Typography>
                    <TaskDependencyBtn title='Delete' onClick={() => navigate(`/project/${id}/taskDependency/deleteTaskDependency`)} />
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}
const TaskDependency = () => {

    const navigate = useNavigate();
    let { id } = useParams();
    const classes = useStyles();
    return (
        <>

            <Box sx={{ backgroundColor: '#EAEDF0', height: '100%' }}    >
                <Box   >
                    <Box className={classes.dashboardImg} p={3}  >
                        <HeadingOne sx={{color:'white'}} title="Task Dependency" />
                    </Box>
                </Box>
                <Box sx={{position:'absolute',top:'220px'}}  >
                    <ActionCard />
                </Box>

            </Box>


        </>
    )
}

export default TaskDependency