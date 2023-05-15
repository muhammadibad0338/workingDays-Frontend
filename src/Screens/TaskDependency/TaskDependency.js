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
    Grid
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles, withStyles } from "@mui/styles";
import { useNavigate, useParams } from 'react-router-dom';
import ContainedBtn from '../../Components/ContainedBtn';


const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const TaskDependency = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    return (
        <>
            <Grid container p={3} >
                <Grid item xs={12} mb={10} >
                    <ColorText variant='h4' >TaskDependency</ColorText>
                </Grid>
                <Grid item xs={12} md={4}
                    onClick={() => navigate(`/project/${id}/taskDependency/addTaskDependency`)}  >
                    <ContainedBtn title='Add Task Dependency' />
                </Grid>
                <Grid item xs={12} md={4}  >
                    <ContainedBtn title='Edit Task Dependency' />
                </Grid>
                <Grid item xs={12} md={4}  >
                    <ContainedBtn title='Delete Task Dependency' />
                </Grid>
            </Grid>
        </>
    )
}

export default TaskDependency