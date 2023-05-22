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
    CircularProgress,
    Chip
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
import { getUserTeam, updateUserDesignation } from "../../Redux/User/UserAction"



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
        // cursor: 'pointer',
        '&:hover': {
            // backgroundColor: '#E8EBEF'
        }
    },
    tableRow: {
        // cursor: 'pointer',
        "&:hover": {
            // color: "#09926E",
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
        },
    },
    stickyBox: {
        position: 'sticky',
        top: '72px',
        // backgroundColor:'#FFFFFF',
        backgroundColor: theme.palette.type === "light" ? "#FFFF" : "#0A1929",
        zIndex: '99',
    },
    lastActionBox: {
        width: '-webkit-fill-available',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh'
}));

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));




const CompanyChip = styled(Chip)(({ theme }) => ({
    backgroundColor: '#EEDCDC',
    color: '#E52F2F',
    margin: "0px 5px",
    border: '2px solid #E52F2F',
    cursor: 'pointer'
}));
const EditChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#5800FF',
    color: '#FFFF',
    margin: "0px 5px",
    border: chip ? '2px solid #4CCFF8' : 'none',
    cursor: 'pointer'
}));
const DetailsChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#2BC155',
    color: '#FFFF',
    margin: "0px 5px",
    border: chip ? '2px solid #2BC155' : 'none',
    cursor: 'pointer'
}));
const ManagerChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#DFECF0',
    color: '#4CCFF8',
    margin: "0px 5px",
    border: chip ? '2px solid #4CCFF8' : 'none',
    cursor: 'pointer'
}));
const LeadChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#DBEAE0',
    color: '#2BC155',
    margin: "0px 5px",
    border: chip ? '2px solid #2BC155' : 'none',
    cursor: 'pointer'
}));
const JuniorChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#DFDFEE',
    color: '#4A4BE3',
    margin: "0px 5px",
    border: chip ? '2px solid #4A4BE3' : 'none',
    cursor: 'pointer'
}));
const InternChip = styled(Chip)(({ theme, chip }) => ({
    backgroundColor: '#F1E2DF',
    color: '#FF6D4D',
    margin: "0px 5px",
    border: chip ? '2px solid #FF6D4D' : 'none',
    cursor: 'pointer'
}));

const Team = ({ currentUser, getUserTeam, userTeam, updateUserDesignation }) => {
    const classes = useStyles();
    const [isDialogOpen, setisDialogOpen] = useState(false)
    const [operationLOading, setOperationLOading] = useState(false)

    const [continueDesignationRequest, setContinueDesignationRequest] = useState(false)
    const [designationLevel, setDesignationLevel] = useState(-1)
    const [userIndex, setUserIndex] = useState(-1)

    const uid = localStorage.getItem('uid')

    useEffect(() => {
        getUserTeam(uid)
    }, [])


    let jobRoleChip = {
        'manager': <ManagerChip />,
        "teamLead": <LeadChip />,
        "juniorDeveloper": <JuniorChip />,
        "intern": <InternChip />
    }

    let jobTitleByLevel = {
        '1': 'executive',
        '2': 'manager',
        '3': 'teamLead',
        '4': 'juniorDeveloper',
        '5': 'intern'
    }

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
                                <ColorText>{userTeam?.team?.name}
                                 {/* {continueDesignationRequest ? "true" : 'false'} {userIndex} */}
                                  </ColorText>
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
                                                            <Box ml={4} className={classes.lastActionBox} >
                                                                {person?.level === 0 && <CompanyChip label='COMPANY' />}
                                                                {person?.level === 1 && <ManagerChip label='Exectuive' />}
                                                                {person?.level === 2 && <ManagerChip label='Manager' />}
                                                                {person?.level === 3 && <LeadChip label='Team Lead' />}
                                                                {person?.level === 4 && <JuniorChip label='Junior Developer' />}
                                                                {person?.level === 5 && <InternChip label='Intern' />}

                                                                {([0, 1,2].includes(currentUser?.level) && person.level !== 0 && person.level !== currentUser.level &&  currentUser.level < person.level )  && <EditChip label="Change Designation" onClick={() => {
                                                                    if (userIndex === i) {
                                                                        setUserIndex(-1)
                                                                        setContinueDesignationRequest(false)
                                                                        setDesignationLevel(-1)
                                                                    }
                                                                    else {
                                                                        setUserIndex(i)
                                                                        setContinueDesignationRequest(true)
                                                                        setDesignationLevel(person.level)
                                                                    }
                                                                }} />
                                                                }
                                                                {/* <DetailsChip label="Details" /> */}
                                                            </Box>

                                                        </Box>
                                                        {(continueDesignationRequest && userIndex === i) && <Box p={2} >
                                                            <ColorText variant="h6" sx={{ fontWeight: 'bold' }} >Select Designation</ColorText>
                                                            <Box my={2} >
                                                                <ManagerChip label='Exectuive' chip={(designationLevel === 1) ? true : false}
                                                                    onClick={() => setDesignationLevel(1)} />
                                                                <ManagerChip label='Manager' chip={(designationLevel === 2) ? true : false}
                                                                    onClick={() => setDesignationLevel(2)} />
                                                                <LeadChip label='Team Lead' chip={(designationLevel === 3) ? true : false}
                                                                    onClick={() => setDesignationLevel(3)} />
                                                                <JuniorChip label='Junior Developer' chip={(designationLevel === 4) ? true : false}
                                                                    onClick={() => setDesignationLevel(4)}
                                                                />
                                                                <InternChip label='Intern' chip={(designationLevel === 5) ? true : false}
                                                                    onClick={() => setDesignationLevel(5)}
                                                                />
                                                                {(person.level !== designationLevel && designationLevel !== -1  ) && <Box mt={4} >
                                                                    <ContainedBtn title="Change Designation"
                                                                        disabled={operationLOading}
                                                                        onClick={() => {
                                                                            setOperationLOading(true)
                                                                            updateUserDesignation({
                                                                                level: designationLevel,
                                                                                employee: person._id,
                                                                                employeer: uid,
                                                                                joinedSoftwareCompany: currentUser.level === 0 ? uid : currentUser.joinedSoftwareCompany,
                                                                                title: jobTitleByLevel[String(designationLevel)]
                                                                            }).then((res) => {
                                                                                setOperationLOading(false)
                                                                                setUserIndex(-1)
                                                                        setContinueDesignationRequest(false)
                                                                        setDesignationLevel(-1)
                                                                            })
                                                                        }} />
                                                                </Box>}
                                                            </Box>
                                                        </Box>}
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
    getUserTeam: (id) => dispatch(getUserTeam(id)),
    updateUserDesignation: (data) => dispatch(updateUserDesignation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);