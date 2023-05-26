import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TablePagination,
    Box,
    CircularProgress,
    Chip,
    NativeSelect,
    InputBase,
    Typography
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import State from "../../../State/Project.json"
import { connect } from "react-redux";
import moment from 'moment/moment';
import Pagination from '../../../Components/Pagination';

const useStyles = makeStyles((theme) => ({
    iconImg: {
        height: '36px',
        width: '36px',
        borderRadius:'50%',
        marginRight: '10px',
    },
    tableContainer: {
        fontFamily: "inherit",
    },
    tableRow: {
        cursor: 'pointer',
        "&:hover": {
            color: "#09926E",
            backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#14273A",
        },
    },
    tableCell: {
        fontFamily: "inherit",
        // backgroundColor: "#0095FF",
        color: "white !important",
        textAlign: "left",
        fontWeight: "bold !important",
        fontSize: '15px !important',
        textTransform: "upperCase",
    },
    tableCellBody: {
        textAlign: "left",
    },
    select: {
        border: '1px solid #ced4da',
        borderRadius: 4,
        outline: 'none',
        padding: '5px',
        outline: 'none',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    tableHead: {
        backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
        borderTopLeftRadius: "10px !important"
    }
}));
const ToggleTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#E1E1E1',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#F3F3F3',
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {

        borderRadius: "10px",
        marginTop: "5px",
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        // padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
        // outline: '1px solid black',
    },
}))(InputBase);

const ListView = ({ userProjects }) => {
    const classes = useStyles();
    let navigate = useNavigate();

    const navigateToProjectBoard = (ind) => {
        navigate(`/project/${ind}`)
    }
    return (
        <>
            <TableContainer className={classes.tableContainer}>
                <Table  >
                    <TableHead className={classes.tableHead} >
                        <TableRow >
                            <TableCell className={classes.tableCell} sx={{ borderTopLeftRadius: '10px' }}  >#</TableCell>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell className={classes.tableCell}>Name</TableCell>
                            <TableCell className={classes.tableCell}>Project Member</TableCell>
                            <TableCell className={classes.tableCell} sx={{ borderTopRightRadius: '10px' }}  >Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userProjects.map((project, ind) => {
                                return (
                                    <StyledTableRow key={ind} className={classes.tableRow} onClick={() => navigateToProjectBoard(project?._id)} >
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{ind + 1}</ToggleTypography> </TableCell>
                                        <TableCell className={classes.tableCellBody} >
                                            <img className={classes.iconImg} src={project?.icon} alt="Icon" />
                                        </TableCell>
                                        <TableCell className={classes.tableCellBody}  >
                                            <Box sx={{ display: 'flex' }} >
                                                {/* <img className={classes.iconImg} src={project?.icon} alt="Icon" /> */}
                                                <ToggleTypography>{project?.name}</ToggleTypography>
                                            </Box>
                                        </TableCell>
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{project?.projectTeam?.length} Members</ToggleTypography>  </TableCell>
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{moment(project?.createdAt).format("DD/MM/YYYY")}</ToggleTypography>  </TableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                totalEntries={userProjects.length} />
        </>
    )
}

//Redux Action
const mapStateToProps = (store) => ({
    reduxLoading: store.user.loading,
    currentUser: store.user.user,
    userProjects: store.project.projects
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);