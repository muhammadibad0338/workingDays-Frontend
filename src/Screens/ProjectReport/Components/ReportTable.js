import React, { useState, useEffect } from 'react';
import {
    CircularProgress,
    Divider,
    Grid,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => ({
    iconImg: {
        height: '36px',
        width: '36px',
        borderRadius: '50%',
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#E1E1E1',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#F3F3F3',
    },
}));

const ToggleTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main,
}));

const StatusTypography = styled(Typography)(({ theme, Status }) => ({
    color: Status ? "#2BC155" : "#E52F2F",
}));


const ReportTable = ({ taskReports }) => {

    const classes = useStyles();

    return (
        <>
            {taskReports?.length === 0 ? <CircularProgress sx={{ color: "#0096FF" }} /> : <TableContainer className={classes.tableContainer}>
                <Table  >
                    <TableHead className={classes.tableHead} >
                        <TableRow >
                            <TableCell className={classes.tableCell} sx={{ borderTopLeftRadius: '10px' }}  >Task Id</TableCell>
                            <TableCell className={classes.tableCell}>Task Name</TableCell>
                            <TableCell className={classes.tableCell}>Assign To</TableCell>
                            <TableCell className={classes.tableCell}>DeadLine Period</TableCell>
                            <TableCell className={classes.tableCell}>Complete</TableCell>
                            <TableCell className={classes.tableCell}>Late</TableCell>
                            <TableCell className={classes.tableCell} sx={{ borderTopRightRadius: '10px' }}  >Late Days</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            taskReports?.map((task, ind) => {
                                return (
                                    <StyledTableRow key={ind} className={classes.tableRow}  >
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{task?._id}</ToggleTypography> </TableCell>
                                        <TableCell className={classes.tableCellBody} > <ToggleTypography>{task?.name}</ToggleTypography></TableCell>
                                        <TableCell className={classes.tableCellBody}  >
                                            <ToggleTypography>{task?.employee?.name}</ToggleTypography>
                                        </TableCell>
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{moment(task?.deadlineStart).format("DD/MM/YYYY")} --- {moment(task?.deadlineEnd).format("DD/MM/YYYY")}</ToggleTypography>  </TableCell>
                                        <TableCell className={classes.tableCellBody} ><StatusTypography Status={task?.isComplete} >{task?.isComplete ? "True" : 'False'} </StatusTypography>  </TableCell>
                                        <TableCell className={classes.tableCellBody} ><StatusTypography Status={task?.isLate} >{task?.isLate ? "True" : 'False'} </StatusTypography>  </TableCell>
                                        <TableCell className={classes.tableCellBody} ><ToggleTypography>{task?.isLate ? task?.daysLate : " No Late"} </ToggleTypography>  </TableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}

export default ReportTable