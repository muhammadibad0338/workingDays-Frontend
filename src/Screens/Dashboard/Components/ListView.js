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
    InputBase
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import State from "../../../State/Project.json"
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    iconImg: {
        height: '20px',
        width: '20px',
        marginRight: '5px',
    },
    tableContainer: {
        fontFamily: "inherit",
    },
    tableRow: {
        cursor:'pointer',
        "&:hover": {
            color: "#09926E",
            backgroundColor: "#f5f5f5",
        },
    },
    tableCell: {
        fontFamily: "inherit",
        backgroundColor: "#0095FF",
        color: "#ffff",
        textAlign: "left",
        fontWeight: "bold",
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
    }
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

const ListView = ({userProjects}) => {
    const classes = useStyles();
    let navigate = useNavigate();

    const navigateToProjectBoard = (ind) => {
        navigate(`/project/${ind}`)
    }
    return (
        <>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>#</TableCell>
                            <TableCell className={classes.tableCell}>Name</TableCell>
                            <TableCell className={classes.tableCell}>Type</TableCell>
                            <TableCell className={classes.tableCell}>Lead</TableCell>
                            {/* <TableCell className={classes.tableCell}>date</TableCell> */}
                            <TableCell className={classes.tableCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userProjects.map((project, ind) => {
                                return (
                                    <TableRow key={ind} className={classes.tableRow} onClick={() => navigateToProjectBoard(ind)} >
                                        <TableCell className={classes.tableCellBody} >{ind + 1}</TableCell>
                                        <TableCell className={classes.tableCellBody}  > <img className={classes.iconImg} src={project?.icon} alt="Icon" /> {project?.name} </TableCell>
                                        <TableCell className={classes.tableCellBody} > {project?.description} </TableCell>
                                        <TableCell className={classes.tableCellBody} > Service management </TableCell>
                                        <TableCell className={classes.tableCellBody} >
                                            <NativeSelect
                                                key={ind}
                                                fullWidth
                                                input={<BootstrapInput />}
                                                className={classes.select}
                                            >
                                                <option>options</option>
                                                <option value={"Accepted"}>Accept</option>
                                                <option value={"Rejected"}>Reject</option>
                                            </NativeSelect>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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