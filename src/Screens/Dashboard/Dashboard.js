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


const ProjectHead = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
}));


const Dashboard = ({ currentUser }) => {
  return (
    <>
      <ResponsiveAppbar currentUser={currentUser} />
      {/* <div>Welcome {currentUser?.name}</div> */}
      <Container maxWidth='fl' >
        <Grid container >
          <Grid item xs={12} mt={4} >
            <ProjectHead  >Projects</ProjectHead>
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