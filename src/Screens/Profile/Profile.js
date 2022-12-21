import React from 'react';
import { makeStyles, withStyles } from "@mui/styles";
import { connect } from "react-redux";
import {
  Box, Typography, Container, Grid, OutlinedInput,Button
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  bgShade: {
    width: '100%',
    height: '200px',
    // background: 'linear-gradient(to right,#5800FF,#ffff)',
    background: 'rgb(88,0,255)',
    background: 'linear-gradient(90deg, rgba(88,0,255,1) 40%, rgba(0,0,0,0.12368697478991597) 98%)'
  },
  profilePicture: {
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    marginTop: '-50px',
    outline: '7px solid white'
  },
  namehead: {
    fontWeight: 'bold !important',
    marginTop: '15px !important'
  },
  productInput: {
    marginTop: "10px",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
}));

const Profile = ({ currentUser }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.bgShade} />
      <Container maxWidth='md' >
        <Grid container >
          <Grid item xs={12} >
            <img src={currentUser?.profilePicture} alt="Profile Picture" className={classes.profilePicture} />
          </Grid>
          <Grid item xs={12} >
            <Typography variant='h4' className={classes.namehead} > {currentUser?.name}</Typography>
          </Grid>
          <Grid xs={12} pr={1} md={6}>
            <Box my={2} style={{ width: "auto" }}>
              <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                Phone Number
              </Typography>
              <OutlinedInput
                fullwidth
                required={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                // placeholder="e.g Pizza"
                // type="number"
                value={currentUser?.phoneNumber}
              // onChange={(e) => {
              //   setcredentials({
              //     ...credentials,
              //     price: e.target.value,
              //   });
              // }}
              />
            </Box>
          </Grid>
          <Grid xs={12} pl={1} md={6}>
            <Box my={2} style={{ width: "auto" }}>
              <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                Email
              </Typography>
              <OutlinedInput
                fullwidth
                required={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                // placeholder="e.g Pizza"
                type="email"
                value={currentUser?.email}
              // onChange={(e) => {
              //   setcredentials({
              //     ...credentials,
              //     price: e.target.value,
              //   });
              // }}
              />
            </Box>
          </Grid>
          <Grid xs={12}  >
            <Box my={2} style={{ width: "auto" }}>
              <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                Description
              </Typography>
              <OutlinedInput
                fullwidth
                rows={6}
                multiline={true}
                required={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                // placeholder="e.g Pizza"
                type="text"
                value={currentUser?.description}
              // onChange={(e) => {
              //   setcredentials({
              //     ...credentials,
              //     price: e.target.value,
              //   });
              // }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Button
              type="submit"
              style={{ backgroundColor: "#0095FF", color: "white" }}
            >
              save
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);