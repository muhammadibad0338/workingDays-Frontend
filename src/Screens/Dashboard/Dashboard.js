import React, { useState } from 'react'
import { connect } from "react-redux";
import ResponsiveAppbar from '../../Components/ResponsiveAppbar';
import {
  Box,
  Typography,
  Grid,
  Container,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { styled } from '@mui/system';
import ContainedBtn from '../../Components/ContainedBtn';
import { makeStyles, withStyles } from "@mui/styles"
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import SearchBar from '../../Components/SearchBar';
import GridView from './Components/GridView';
import ListView from './Components/ListView';

const ProjectHead = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
}));

const useStyles = makeStyles((theme) => ({
  spaceBtwn: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  alignEnd: {
    display: 'flex',
    justifyContent: 'end'
  }
}));


const Dashboard = ({ currentUser }) => {
  const classes = useStyles();

  //Toggle View
  const [alignment, setAlignment] = React.useState('listView');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
            <SearchBar />
          </Grid>
          <Grid item xs={12} className={classes.alignEnd} >
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
            >

              <ToggleButton value="listView" aria-label="left aligned" >
                <ListIcon />
              </ToggleButton>
              <ToggleButton value="gridView" aria-label="left aligned" >
                <GridViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} mt={4} >
            {
              alignment === "gridView" ? <GridView /> : <ListView />
            }
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