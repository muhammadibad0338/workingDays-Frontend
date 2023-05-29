import React,{useState} from 'react';
import {
    Box,
    Typography,
    Grid,
    Container,
    Hidden,
    InputBase,
    Paper,
    OutlinedInput,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button,
    CircularProgress,
    InpuBase,
    IconButton
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


const useStyles = makeStyles((theme) => ({
    rootSearch: {
        padding: "1px 3px",
        display: "flex",
        alignItems: "center",
        width: 300,
        borderRadius:'20px !important',
        // marginBottom: 20,
        // marginTop: 30,
        marginLeft:'80px !important',
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const SearchBar = ({showClear,btnClickHandler,reduxUserLoading,...props}) => {
    const classes = useStyles();
    // const [showClear, setshowClear] = useState(false);
    return (
        <Box my={2}>
            <Paper elevation={2} className={classes.rootSearch}>
                <InputBase
                    className={classes.input}
                    placeholder="Search..."
                    // value={searchString}
                    // onChange={(e) => handleSearch(e)}
                    // onKeyPress={e => {
                        // if (e.charCode === 13) {
                        //   handleGetData(0, 10)
                        //   setshowClear(true)
                        // }
                    // }}
                    {...props}
                    disabled={reduxUserLoading}
                />
                <IconButton className={classes.iconButton} onClick={btnClickHandler} >
                    {/* {showClear ? <ClearIcon /> : <SearchIcon />} */}
                    <SearchIcon/>
                </IconButton>
            </Paper>
        </Box>
    )
}

export default SearchBar