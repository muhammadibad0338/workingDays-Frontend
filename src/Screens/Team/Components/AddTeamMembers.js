import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Tooltip,
    Chip,
    Avatar,
    Divider
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, } from "@mui/styles"
import CloseIcon from '@mui/icons-material/Close';
import FullScreenDialog from '../../../Components/Dialog';
import ContainedBtn from '../../../Components/ContainedBtn';
import SearchBar from '../../../Components/SearchBar';
import { connect } from "react-redux";
import { getSearchUsers, sentRequest } from '../../../Redux/User/UserAction';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    alignEnd: {
        // width: '570px !important',
        display: 'flex',
        justifyContent: 'end',
    },
    searchResultCntnr: {
        width: '100%',
        height: 'auto',
        maxHeight: '100px',
    },
    contactBox: {
        // minWidth:'auto',
        width: 'auto',
        maxWidth: '550px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid gray',
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            // backgroundColor: '#E8EBEF'
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
        }
    },
    innerContactBox: {
        // minWidth:'auto',
        width: 'auto',
        display: 'flex',
    },
    stickyBox: {
        position: '-webkit-sticky',
        position: 'sticky',
        // top: '30px',
        backgroundColor: 'inherit',
        zIndex: '99',
    },
    IconButton: {
        backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
        border: ' 2px solid #FFFFFF !important',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '50px'
    },
}));

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const ColorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
}));


const Stop = styled(Chip)(({ theme }) => ({
    backgroundColor: '#EEDCDC',
    color: '#E52F2F',
    margin: "0px 5px",
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


const AddTeamMembers = ({ isDialogOpen, hideDialogHandler, getSearchUsers, reduxUserLoading, searchUser, userTeam, sentRequest }) => {
    const classes = useStyles();
    const [showClear, setshowClear] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [searchLoading, setsearchLoading] = useState(false)
    const [continueSendRequest, setContinueSendRequest] = useState(false)
    const [userIndex, setUserIndex] = useState(-1)
    const uid = localStorage.getItem('uid')

    const [jobTitle, setJobTitle] = useState('')

    const handelSearch = (e) => {
        setSearchQuery(e.target.value)

    }
    const btnClickHandler = () => {
        if (!reduxUserLoading) {
            getSearchUsers(searchQuery)
        }
    }

    // <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
    //     sentRequest({
    //         employee: user._id,
    //         softwareCompany: uid
    //     })
    // }} />


    let jobRoleByLevel = {
        'manager': 2,
        "teamLead": 3,
        "juniorDeveloper": 4,
        "intern": 5
    }

    let jobRoleChip = {
        'manager': <ManagerChip />,
        "teamLead": <LeadChip />,
        "juniorDeveloper": <JuniorChip />,
        "intern": <InternChip />
    }

    return (
        <>
            <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={hideDialogHandler} >
                <ColorBox   >
                    <Box className={classes.stickyBox}  >
                        <Box className={classes.alignEnd} p={2} >
                            <IconButton aria-label="Close" onClick={hideDialogHandler} className={classes.IconButton}  >
                                <ColorText>
                                    <CloseIcon fontSize='large' sx={{ color: '#FFFFFF', pt: 1 }} />
                                </ColorText>
                            </IconButton>
                        </Box>
                        <Box p={2} >
                            <ColorText variant='h6' style={{ fontWeight: 'bold' }} >Add Team Member to WorkingDays </ColorText>
                        </Box>
                        <Divider sx={{ height: '2px', backgroundColor: '#21268C' }} />
                        <Box my={2} p={2} >
                            <ColorText style={{ marginBottom: '-20px' }} >Name or emails </ColorText>
                            <SearchBar
                                onChange={(e) => handelSearch(e)}
                                value={searchQuery}
                                btnClickHandler={btnClickHandler}
                                loading={reduxUserLoading}
                            />

                        </Box>
                    </Box>
                    <Box className={classes.searchResultCntnr}  >
                        {
                            reduxUserLoading ? <CircularProgress /> : searchUser.map((user, ind) => {
                                if (user.role !== "softwareCompany") {
                                    return (
                                        <Box key={ind} >
                                            <Box p={2} className={classes.contactBox}   >
                                                <Box className={classes.innerContactBox}>
                                                    <Tooltip sx={{ background: 'inherit' }} >
                                                        <Avatar src={user?.profilePicture} />
                                                    </Tooltip>
                                                    <Box ml={1} >
                                                        <ColorText style={{ fontSize: '13px' }} >{user?.name} </ColorText>
                                                        <ColorText style={{ fontSize: '13px' }} >{user?.email} </ColorText>
                                                    </Box>
                                                </Box>
                                                {
                                                    user?.joinedSoftwareCompany == uid ? <ColorText>Already in your softwareCompany</ColorText>
                                                        : <ContainedBtn title={userIndex === ind ? "Cancel" : "Continue"}
                                                            endIcon={userIndex === ind ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                            onClick={() => {
                                                                if (continueSendRequest && userIndex === -1) {
                                                                    setUserIndex(-1)
                                                                    setContinueSendRequest(false)
                                                                }
                                                                else {
                                                                    setUserIndex(ind)
                                                                    setContinueSendRequest(true)
                                                                }

                                                                if (userIndex === ind) {
                                                                    setUserIndex(-1)
                                                                    setContinueSendRequest(false)
                                                                }
                                                                setJobTitle('')
                                                            }} />
                                                }
                                            </Box>
                                            {(continueSendRequest && userIndex === ind) && <Box px={2} >
                                                <ColorText style={{ fontSize: '16px', fontWeight: 'bold' }} >Select Job Position </ColorText>
                                                <Box mt={1} mb={2} >
                                                    <ManagerChip label="Manager" chip={jobTitle === "manager" ? true : false}
                                                        onClick={() => setJobTitle('manager')}
                                                    />
                                                    <LeadChip label="Team Lead" chip={jobTitle === "teamLead" ? true : false}
                                                        onClick={() => setJobTitle('teamLead')}
                                                    />
                                                    <JuniorChip label="Junior Developer" chip={jobTitle === "juniorDeveloper" ? true : false}
                                                        onClick={() => setJobTitle('juniorDeveloper')}
                                                    />
                                                    <InternChip label="Intern" chip={jobTitle === "intern" ? true : false}
                                                        onClick={() => setJobTitle('intern')}
                                                    />
                                                </Box>
                                            </Box>}
                                            {(jobTitle.trim('').length > 0 && userIndex === ind) && <Box px={2} pb={2} className={classes.alignEnd} >
                                                <ContainedBtn title="add Employee" endIcon={<PersonAddAltIcon />} onClick={() => {
                                                    sentRequest({
                                                        employee: user._id,
                                                        softwareCompany: uid,
                                                        title: jobTitle,
                                                        AppointedBy: uid,
                                                        level: jobRoleByLevel[jobTitle],
                                                        company: uid
                                                    }).then((res) => {
                                                        if (res) {
                                                            setJobTitle('')
                                                            setUserIndex(-1)
                                                            setContinueSendRequest(false)
                                                            btnClickHandler()
                                                        }
                                                    })
                                                }} />
                                            </Box>}
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>

                </ColorBox>
            </FullScreenDialog>
        </>
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
    getSearchUsers: (key) => dispatch(getSearchUsers(key)),
    sentRequest: (data) => dispatch(sentRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamMembers);