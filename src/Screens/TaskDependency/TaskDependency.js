import React from 'react'
import {
    Tooltip,
    Avatar,
    CircularProgress,
    OutlinedInput,
    NativeSelect,
    InputBase,
    Button,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Icon
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
        height: '240px !important',
        backgroundImage: `url(${dashboardBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px 10px 10px 10px !important',
    }, taskCard: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '10px',
        height: '150px !important',
        width: '300px !important',
        marginRight: '30px',
        borderRadius: '12px 12px 6px 6px !important'
    },

    backSet: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border:'3px solid #4A4BE3',
        textAlign:'center',
        lineHeight:'100px',
        verticalAlign:'middle',
        backgroundColor:'#FFFFFF',

    },
     depIcon: {
        fontSize: '50px !important',
        color: '#4A4BE3 !important',
        verticalAlign:'middle',
    },
    taskText:
    {
    color: '#7A7A7A',
    
    }
}))

const TaskDependency = () => {

    const navigate = useNavigate();
    let { id } = useParams();
    const classes = useStyles();
    return (
        <>
            <div className={classes.dashboardImg}>
                <Grid container p={3}  >
                    <Grid item xs={12} mb={10} >
                        {/* <ColorText variant='h4' >Task Dependency</ColorText> */}
                        <HeadingOne title="Task Dependency" />
                    </Grid>

                    {/* <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                        
                            <Grid item xs={12} md={4}
                            
                                onClick={() => navigate(`/project/${id}/taskDependency/addTaskDependency`)}  >
                                <ContainedBtn title='Add Task Dependency'  />
                                
                            </Grid>
                            
                        </CardContent>
                    </Card> */}

                    <Card className={classes.taskCard}  >
                        <div className={classes.backSet}>
                            <AddIcon className={classes.depIcon} />
                        </div>
                        <CardContent>
                        
                        </CardContent>
                        
                        <Grid item xs={12} md={4}

                            onClick={() => navigate(`/project/${id}/taskDependency/addTaskDependency`)}  >
                                <Typography mb={1} ml={1} className={classes.taskText}>Add Task</Typography>
                            <TaskDependencyBtn title='Add' />
                            
                        </Grid>
                    </Card>


                    <Card className={classes.taskCard}>
                        <div className={classes.backSet}>
                            <EditSharpIcon className={classes.depIcon} />
                        </div>
                        <CardContent>


                        </CardContent>
                        <Grid item xs={12} md={4}  >
                        <Typography mb={1} ml={1} className={classes.taskText}>Edit Task</Typography>
                            <TaskDependencyBtn title='Edit' />
                        </Grid>
                    </Card>

                    <Card className={classes.taskCard}>
                        <div className={classes.backSet}>
                            <DeleteSharpIcon className={classes.depIcon} />
                        </div>
                        <CardContent>


                        </CardContent>
                        <Grid item xs={12} md={4}  >
                        <Typography mb={1} ml={1} className={classes.taskText}>Delete Task</Typography>
                            <TaskDependencyBtn title='Delete' />
                        </Grid>
                    </Card>

                </Grid>
            </div>
        </>
    )
}

export default TaskDependency