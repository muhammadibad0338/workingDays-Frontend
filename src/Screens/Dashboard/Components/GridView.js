import React from 'react'
import {
  Grid, Typography
} from "@mui/material";
import { styled } from '@mui/system';
import { makeStyles, withStyles } from "@mui/styles";
import State from "../../../State/Project.json"

const useStyles = makeStyles((theme) => ({
  mainCntntr: {
    width: '280px',
    height: '300px',
    borderRadius: "10px",
    boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    margin: "10px",
    padding: '10px',
    cursor: 'pointer',
    "&:hover": {
      boxShadow: 'rgb(114, 255, 255) 0px 7px 29px 0px',
    },
  }
}));


const GridView = () => {
  const classes = useStyles();
  return (
    <Grid container >
      <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        {
          State.projects.map((project, ind) => {
            return (
              <div className={classes.mainCntntr} key={ind} >
                <img src={project.image} style={{ height: '35%', width: '100%', borderRadius: '5px', marginTop: '5px' }} />
                <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between'}} >
                  <Typography variant='h5' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px', letterSpacing: '2px' }} > {project.name} </Typography>
                  <Typography variant='h6' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px' }} >LEAD : {project.lead} </Typography>
                  <Typography variant='h6' style={{ textTransform: 'uppercase', color: '#5800FF', fontWeight: 'bold', margin: '5px 0px' }} > {project.type} </Typography>
                </div>
              </div>
            )
          })
        }
      </Grid>
    </Grid>
  )
}

export default GridView