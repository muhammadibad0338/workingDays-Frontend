import React, { useState, useEffect } from 'react';
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
    Avatar,
    IconButton,
    CircularProgress
} from "@mui/material";
import { makeStyles, } from "@mui/styles"
import { styled } from '@mui/system';
import HeadingOne from '../../Components/HeadingOne';
import SearchBar from '../../Components/SearchBar';
import ContainedBtn from '../../Components/ContainedBtn';
import AddIcon from '@mui/icons-material/Add';
import State from "../../State/Team.json"
import FullScreenDialog from '../../Components/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import AddTeamMembers from './Components/AddTeamMembers';
import { connect } from "react-redux";
import { getUserTeam } from "../../Redux/User/UserAction"



const useStyles = makeStyles((theme) => ({
    spaceBtwn: {
        display: 'flex',
        justifyContent: 'space-between',

    },
    alignEnd: {
        width: '570px !important',
        display: 'flex',
        justifyContent: 'end',
    },
    tableContainer: {
        fontFamily: "inherit",
    },
    contactBox: {
        display: 'flex',
        borderTop: '1px solid gray',
        cursor: 'pointer',
        '&:hover': {
            // backgroundColor: '#E8EBEF'
        }
    },
    tableRow: {
        cursor: 'pointer',
        "&:hover": {
            // color: "#09926E",
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
        },
    },
    stickyBox: {
        position: 'sticky',
        top: '72px',
        // backgroundColor:'#FFFFFF',
        backgroundColor: 'inherit',
        zIndex: '99',
    }
}));

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh'
}));

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));

const Team = ({ currentUser, getUserTeam, userTeam }) => {
    const classes = useStyles();
    const [isDialogOpen, setisDialogOpen] = useState(false)
    const uid = localStorage.getItem('uid')

    useEffect(() => {
        getUserTeam(uid)
    }, [])


    return (
        <ColorBox>
            <Container maxWidth='fl' >
                <Grid container >
                    <Grid item xs={12} mt={4} className={classes.stickyBox} >
                        <Box pt={1} className={classes.spaceBtwn}  >
                            <Box>
                                <HeadingOne title="Team" />
                                <ColorText>{userTeam?.teamMembers?.length} Team Members</ColorText>
                            </Box>
                            {currentUser?.role == "softwareCompany" && <ContainedBtn title='ADD' startIcon={<AddIcon />} onClick={() => setisDialogOpen(true)} />}
                        </Box>
                        {/* <SearchBar /> */}
                    </Grid>
                    {/* <Grid item xs={12} style={{ display: 'flex' }}  >
                    </Grid> */}
                    <Grid item xs={12} mt={5} >
                        {Object.keys(userTeam).length == 0 ? <CircularProgress /> : <Box  >
                            <Box px={2} py={0.5} style={{ backgroundColor: 'inherit' }} >
                                <ColorText>{userTeam?.team?.name} </ColorText>
                            </Box>
                            <TableContainer className={classes.tableContainer}>
                                <Table>
                                    <TableBody>
                                        {
                                            userTeam?.team?.teamMembers?.map((person, i) => {
                                                return (
                                                    <Box key={i} className={classes.tableRow}  >
                                                        <Box p={2} className={classes.contactBox} >
                                                            <Tooltip sx={{ backgroundColor: 'inherit' }} >
                                                                <Avatar src={person?.profilePicture} />
                                                            </Tooltip>
                                                            <Box ml={1} >
                                                                <ColorText style={{ fontSize: '13px' }} >{person?.name} </ColorText>
                                                                <ColorText style={{ fontSize: '13px' }} >{person?.email} </ColorText>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>}
                    </Grid>
                </Grid>
            </Container>
            <AddTeamMembers
                isDialogOpen={isDialogOpen}
                hideDialogHandler={() => setisDialogOpen(false)}
            />
        </ColorBox>
    )
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.user.loading,
    currentUser: store.user.user,
    searchUser: store.user.searchUser,
    userTeam: store.user.userTeam
});


const mapDispatchToProps = (dispatch) => ({
    getUserTeam: (id) => dispatch(getUserTeam(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);