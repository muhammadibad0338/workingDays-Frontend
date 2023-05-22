import React from 'react'
import {
  Grid, Typography
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import State from "../../../State/Project.json"
import { connect } from "react-redux";
import ContainedBtn from '../../../Components/ContainedBtn';
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => ({
  mainCntntr: {
    width: '280px',
    height: '330px',
    borderRadius: "10px",
    boxShadow: theme.palette.type == "light" ? "0 0.5rem 1rem rgb(0 0 0 / 15%)" : 'none',
    margin: "10px",
    padding: '10px',
    cursor: 'pointer',
    border: theme.palette.type == "light" ? 'none' : '2px solid #0096FF',
    "&:hover": {
      boxShadow: theme.palette.type == "light" ? 'rgb(114, 255, 255) 0px 7px 29px 0px' : '0 0.5rem 1rem rgb(0 0 0 / 50%)',
    },
  }
}));


const GridView = ({ userProjects }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const navigateToProjectBoard = (ind) => {
    navigate(`/project/${ind}`)
  }
  return (
    <Grid container >
      <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        {
          userProjects.map((project, ind) => {
            return (
              <div className={classes.mainCntntr} key={ind} >
                <img src={project?.icon} style={{ height: '35%', width: '100%', borderRadius: '5px', marginTop: '5px' }} />
                <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }} >
                  <Typography variant='h5' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px', letterSpacing: '2px' }} > {project?.name} </Typography>
                  <Typography variant='h6' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px' }} >createdAt : {moment(project?.createdAt).format("DD/MM/YYYY")} </Typography>
                  <Typography variant='h6' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px' }} > {project?.projectTeam?.length} Members</Typography>
                </div>
                <ContainedBtn title='View' onClick={() => navigateToProjectBoard(project?._id)} />
              </div>
            )
          })
        }
      </Grid>
    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(GridView);