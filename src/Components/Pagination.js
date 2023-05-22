import React from 'react'
import {
    Grid,
    Box,
    Typography
} from "@mui/material";
import { makeStyles, } from "@mui/styles";

import ContainedBtn from './ContainedBtn';

import prvsIcon from "../Assets/Icons/prvsIcon.png"
import nextIcon from "../Assets/Icons/nextIcon.png"

const useStyles = makeStyles((theme) => ({
    justifyBtwn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    disableBtn: {
        backgroundImage: 'none !important',
        backgroundColor: '#969BA0 !important',
        color: 'white',
        height: '50px',
        width: '130px',
        marginTop: '10px !important'

    },
    enableBtn: {
        color: 'white',
        height: '50px',
        width: '130px',
        marginTop: '10px !important'
    },
    unSelectPaginationBtn: {
        backgroundImage: 'none !important',
        backgroundColor: '#E3E4EB !important',
        color: '#2F4CDD !important',
        margin: '0px 5px !important'
    }
}));

const Pagination = ({ totalEntries, prvsMethod, nextMethod }) => {
    const classes = useStyles();

    return (
        <Grid container sx={{ backgroundColor: 'white' }} >
            <Grid item xs={12} >
                <Box py={4} px={2} className={classes.justifyBtwn} >
                    <Typography sx={{ pr: 1 }} >{totalEntries} Entries </Typography>
                    <Box style={{ display: 'flex', flexWrap: 'wrap' }} >
                        <ContainedBtn className={classes.disableBtn}
                            startIcon={<img src={prvsIcon} style={{ height: '25px', width: '25px' }} />}
                            title="Previous"
                            onClick={() => prvsMethod()}
                        />
                        <Box sx={{ backgroundColor: '#E3E4EB', p: 1, mx: 2, borderRadius: '10px', my: 1 }} >
                            <ContainedBtn title="1" />
                            <ContainedBtn title="2" className={classes.unSelectPaginationBtn} />
                            <ContainedBtn title="3" className={classes.unSelectPaginationBtn} />
                            <ContainedBtn title="4" className={classes.unSelectPaginationBtn} />
                        </Box>
                        <ContainedBtn
                            startIcon={<img src={nextIcon} style={{ height: '25px', width: '25px' }} />}
                            title="Next"
                            onClick={() => nextMethod()}
                            className={classes.enableBtn}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Pagination