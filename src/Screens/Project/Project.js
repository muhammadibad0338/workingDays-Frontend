import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import Model from './Components/Model';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenDialog from '../../Components/Dialog';
import SearchBar from '../../Components/SearchBar';
import ContainedBtn from '../../Components/ContainedBtn';

const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
    },
    mainHead: {
        textTransform: 'uppercase',
        margin: '20px 0px !important',

    },
    modelCntnr: {
        display: 'flex',
        flexFlow: 'row nowrap',
        position: 'sticky',
        width: 'auto',
        height: '100%',
        overflow: 'auto !important',
        flex: '1 1 0%',
    },
    alignCntnr: {
        display: 'flex',
        // backgroundColor:'yellow'
    },
    alignEnd: {
        width: '570px !important',
        display: 'flex',
        justifyContent: 'end',
    },
}));



const AgileCntnr = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    position: 'sticky',
    width: 'auto',
    height: '100%',
    overflow: 'auto !important',
    whiteSpace: 'nowrap',
    flex: '1 1 0%',
}));



export default function MiniDrawer() {
    const theme = useTheme();
    const classes = useStyles();
    let navigate = useNavigate();
    const [isDialogOpen, setisDialogOpen] = useState(false)

    return (
        <>
            <Box p={3} >
                <Typography> <Link to='/' style={{ textDecoration: 'none' }} >Projects / </Link> Splitgate </Typography>
                <Box className={classes.alignCntnr} >
                    <Typography variant='h5' className={classes.mainHead} >Splitgate Board</Typography>
                    <IconButton style={{ marginLeft: '10px' }} color="primary" aria-label="upload picture" component="label"
                        onClick={() => setisDialogOpen(true)}
                    >
                        <PersonAddAlt1Icon />
                    </IconButton>
                </Box>
                <AgileCntnr  >
                    <Model modelHeading='Requirments' />
                    <Model modelHeading='Design' />
                    <Model modelHeading='develop' />
                    <Model modelHeading='test' />
                    <Model modelHeading='deploy' />
                    <Model modelHeading='maintenance' />
                </AgileCntnr>
            </Box>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={() => setisDialogOpen(false)} >
                <Box p={2} >
                    <Box className={classes.alignEnd} >
                        <IconButton aria-label="Close" onClick={() => setisDialogOpen(false)} >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to Project </Typography>
                    <Box my={2} style={{ maxWidth: '300px' }} >
                        <Typography style={{ marginBottom: '-20px' }} >Name or emails</Typography>
                        <SearchBar />
                        <Box mt={1} className={classes.alignEnd} >
                            <ContainedBtn title="ADD" />
                        </Box>
                    </Box>
                </Box>
            </FullScreenDialog>
        </>
    );
}
