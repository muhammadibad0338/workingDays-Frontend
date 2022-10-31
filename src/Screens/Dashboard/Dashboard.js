import React, { useState } from 'react'
import { connect } from "react-redux";
import ResponsiveAppbar from '../../Components/ResponsiveAppbar';
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
import { styled } from '@mui/system';
import ContainedBtn from '../../Components/ContainedBtn';
import { makeStyles, withStyles } from "@mui/styles"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const ProjectHead = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
}));

const useStyles = makeStyles((theme) => ({
  spaceBtwn: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 500,
    marginBottom: 20,
    marginTop: 30,
    [theme.breakpoints.down("md")]: {
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


const Dashboard = ({ currentUser }) => {
  const classes = useStyles();
  const [showClear, setshowClear] = useState(false);
  return (
    <>
      <ResponsiveAppbar currentUser={currentUser} />
      {/* <div>Welcome {currentUser?.name}</div> */}
      <Container maxWidth='fl' >
        <Grid container >
          <Grid item xs={12} mt={4} className={classes.spaceBtwn} >
            <ProjectHead  >Projects</ProjectHead>
            <ContainedBtn title='Create Project' />
          </Grid>
          <Grid item xs={12} >
            <Box my={2}>
              <Paper elevation={2} className={classes.rootSearch}>
                <InputBase
                  className={classes.input}
                  placeholder="Search..."
                  // value={searchString}
                  // onChange={(e) => handleSearch(e)}
                  onKeyPress={e => {
                    // if (e.charCode === 13) {
                    //   handleGetData(0, 10)
                    //   setshowClear(true)
                    // }
                  }}
                />
                <IconButton className={classes.iconButton} >
                  {showClear ? <ClearIcon /> : <SearchIcon />}
                </IconButton>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

//Redux Action
const mapStateToProps = (store) => ({
  reduxLoading: store.user.loading,
  currentUser: store.user.user
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);