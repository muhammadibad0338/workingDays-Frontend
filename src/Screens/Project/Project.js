import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import Model from './Components/Model';



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
    modelCntnr: {
        display: 'flex',
        flexFlow: 'row nowrap',
        position: 'sticky',
        width: 'auto',
        height: '100%',
        overflow: 'auto !important',
        flex: '1 1 0%',
    }
}));



const AgileCntnr = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'sticky',
    width: 'auto',
    height: '100%',
    overflow: 'auto !important',
    whiteSpace:'nowrap',
    flex: '1 1 0%',
}));



export default function MiniDrawer() {
    const theme = useTheme();
    const classes = useStyles();
    let navigate = useNavigate();

    return (
        <Box p={3} >
            <Typography> <Link to='/' style={{ textDecoration: 'none' }} >Projects / </Link> Splitgate </Typography>
            <Typography variant='h5' className={classes.mainHead} >Splitgate Board</Typography>
            <AgileCntnr  >
                <Model modelHeading='Requirments' />
                <Model modelHeading='Design' />
                <Model modelHeading='develop' />
                <Model modelHeading='test' />
                <Model modelHeading='deploy' />
                <Model modelHeading='maintenance' />
            </AgileCntnr>
        </Box>
    );
}
