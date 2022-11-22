import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    ToggleButtonGroup,
    ToggleButton,
    TableBody,
    TableRow,
    TableContainer,
    Table,
    Tooltip,
    Avatar
} from "@mui/material";
import { makeStyles, } from "@mui/styles"
import { styled } from '@mui/system';
import HeadingOne from '../../Components/HeadingOne';
import SearchBar from '../../Components/SearchBar';
import ContainedBtn from '../../Components/ContainedBtn';
import AddIcon from '@mui/icons-material/Add';
import State from "../../State/Team.json"


const useStyles = makeStyles((theme) => ({
    spaceBtwn: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    alignEnd: {
        display: 'flex',
        justifyContent: 'end'
    },
    tableContainer: {
        fontFamily: "inherit",
    },
    contactBox: {
        display: 'flex',
        borderTop: '1px solid gray',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#E8EBEF'
        }
    },
    // tableRow:{
    //     padding:'0px 0px'
    // }
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
                    <Box  >
                        <Box px={2} py={0.5} style={{backgroundColor: '#F1F5F9'}} >
                            <Typography>A</Typography>
                        </Box>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableBody>
                                    {
                                        State.team.map((person, i) => {
                                            return (
                                                <TableRow key={i} className={classes.tableRow} >
                                                    <Box p={2} className={classes.contactBox} >
                                                        <Tooltip >
                                                            <Avatar src={person.image} />
                                                        </Tooltip>
                                                        <Box ml={1} >
                                                            <Typography style={{ fontSize: '13px' }} >{person.name} </Typography>
                                                            <Typography style={{ fontSize: '13px' }} >{person.role} </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box  >
                        <Box px={2} py={0.5} style={{backgroundColor: '#F1F5F9'}} >
                            <Typography>B</Typography>
                        </Box>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableBody>
                                    {
                                        State.team.map((person, i) => {
                                            return (
                                                <TableRow key={i} className={classes.tableRow} >
                                                    <Box p={2} className={classes.contactBox} >
                                                        <Tooltip >
                                                            <Avatar src={person.image} />
                                                        </Tooltip>
                                                        <Box ml={1} >
                                                            <Typography style={{ fontSize: '13px' }} >{person.name} </Typography>
                                                            <Typography style={{ fontSize: '13px' }} >{person.role} </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box  >
                        <Box px={2} py={0.5} style={{backgroundColor: '#F1F5F9'}} >
                            <Typography>C</Typography>
                        </Box>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableBody >
                                    {
                                        State.team.map((person, i) => {
                                            return (
                                                <TableRow key={i} className={classes.tableRow} >
                                                    <Box p={2} className={classes.contactBox} >
                                                        <Tooltip >
                                                            <Avatar src={person.image} />
                                                        </Tooltip>
                                                        <Box ml={1} >
                                                            <Typography style={{ fontSize: '13px' }} >{person.name} </Typography>
                                                            <Typography style={{ fontSize: '13px' }} >{person.role} </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Team