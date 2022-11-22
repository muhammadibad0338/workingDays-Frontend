import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import { makeStyles, } from "@mui/styles"
import { styled } from '@mui/system';
import HeadingOne from '../../Components/HeadingOne';
import SearchBar from '../../Components/SearchBar';
import ContainedBtn from '../../Components/ContainedBtn';
import AddIcon from '@mui/icons-material/Add';


const useStyles = makeStyles((theme) => ({
    spaceBtwn: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    alignEnd: {
        display: 'flex',
        justifyContent: 'end'
    }
}));


const Team = () => {
    const classes = useStyles();

    return (
        <Container maxWidth='fl' >
            <Grid container >
                <Grid item xs={12} mt={4} className={classes.spaceBtwn}  >
                    <Box>
                        <HeadingOne title="Team" />
                        <Typography>30 Team Members</Typography>
                    </Box>
                    <ContainedBtn title='ADD' startIcon={<AddIcon />} />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex' }}  >
                    <SearchBar />
                </Grid>
                <Grid item xs={12} >
                    <Box style={{backgroundColor:'#F1F5F9'}} >
                        
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Team