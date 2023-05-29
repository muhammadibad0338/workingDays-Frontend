import React from 'react'
import {
    Typography,
    Button,
    CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';

const Btn = styled(Button)(({ theme }) => ({
    backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
    color:'white',
    padding:'10px 25px',
    borderRadius:'10px',
    fontWeight:'bold',
    height:'48px',
    width:'120px',
    
    '&:hover':{
        transition: '0.8 s',
        outline: theme.palette.type === "light" ? '' : '2px solid white'
    }
}));

const TaskDependencyBtn = ({ title,sx, loading  ,...props }) => {
    return (
        <Btn variant="contained" sx={sx} {...props} > {loading ? <CircularProgress/> : title } </Btn>
    )
}

export default TaskDependencyBtn