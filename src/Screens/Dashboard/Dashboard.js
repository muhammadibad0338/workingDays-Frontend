import React from 'react'
import { connect } from "react-redux";
import ResponsiveAppbar from '../../Components/ResponsiveAppbar';
import {
  Box,
  Typography,
  Grid,
  Container,
  Hidden,
  InputBase,
  OutlinedInput,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';
import ContainedBtn from '../../Components/ContainedBtn';
import { makeStyles, withStyles } from "@mui/styles"

const ProjectHead = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
}));

const useStyles = makeStyles((theme) => ({
  spaceBtwn: {
      display: 'flex',
      justifyContent:'space-between'
  }
}));


const Dashboard = ({ currentUser }) => {
  const classes = useStyles();
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