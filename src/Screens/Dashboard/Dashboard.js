import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import ResponsiveAppbar from '../../Components/ResponsiveAppbar';
import {
  Box,
  Typography,
  Grid,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  OutlinedInput
} from "@mui/material";
import { styled } from '@mui/system';
import ContainedBtn from '../../Components/ContainedBtn';
import { makeStyles, withStyles } from "@mui/styles"
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../../Components/SearchBar';
import GridView from './Components/GridView';
import ListView from './Components/ListView';
import HeadingOne from '../../Components/HeadingOne';
import FullScreenDialog from '../../Components/Dialog';
import { getUserProjects, createProject } from '../../Redux/Project/ProjectAction';
import { getUserRequest } from '../../Redux/User/UserAction';

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
  },
  alignEndDialogBtn: {
    width: '570px !important',
    display: 'flex',
    justifyContent: 'end',
  },
  productInput: {
    marginTop: "10px",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
}));


const Dashboard = ({ currentUser, getUserProjects, userProjects, createProject, getUserRequest }) => {
  const classes = useStyles();
  const uid = localStorage.getItem('uid')
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const [credentials, setcredentials] = useState({
    name: "",
    description: "",
    icon: "https://splitgate.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10420?size=small",
    employees: [uid],
    user: {
      ...currentUser
    }
  })

  //Toggle View
  const [alignment, setAlignment] = React.useState('listView');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    getUserProjects(uid)

  }, [])


  const createUserProject = () => {
    const uid = localStorage.getItem('uid')
    createProject(credentials, uid)
  }

  const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh'
  }));




  return (
    <ColorBox>
      <Container maxWidth='fl' >
        <Grid container >
          <Grid item xs={12} mt={4} className={classes.spaceBtwn} >
            <HeadingOne title="Projects" />
            {currentUser.role === "softwareCompany" && <ContainedBtn title='Create Project' onClick={() => setisDialogOpen(true)} />}
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
      <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={() => setisDialogOpen(false)} >
        <Box p={2} >
          <Box className={classes.alignEnd} >
            <IconButton aria-label="Close" onClick={() => setisDialogOpen(false)} >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant='h6' style={{ fontWeight: 'bold' }} >Create new project</Typography>
          <Box my={2} style={{}} >
            {/* <Typography style={{ marginBottom: '-20px' }} >Project Name</Typography> */}
            <Box my={3} style={{ width: "100%" }}>
              <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                Project Name
              </Typography>
              <OutlinedInput
                fullwidth
                required={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                placeholder="Project Name"
                type="text"
                // value={currentUser?.email}
                onChange={(e) => {
                  setcredentials({
                    ...credentials,
                    name: e.target.value,
                  });
                }}
              />
            </Box>
            <Box my={3} style={{ width: "100%" }}>
              <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                Project Description
              </Typography>
              <OutlinedInput
                fullwidth
                required={true}
                rows={4}
                multiline={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                placeholder="Description"
                type="text"
                // value={currentUser?.email}
                onChange={(e) => {
                  setcredentials({
                    ...credentials,
                    description: e.target.value,
                  });
                }}
              />
            </Box>
            <Box mt={1} className={classes.alignEndDialogBtn} >
              <ContainedBtn title="Create" onClick={createUserProject} />
            </Box>
          </Box>

        </Box>
      </FullScreenDialog>
    </ColorBox>
  )
}

//Redux Action
const mapStateToProps = (store) => ({
  reduxLoading: store.user.loading,
  currentUser: store.user.user,
  userProjects: store.project.projects
});


const mapDispatchToProps = (dispatch) => ({
  getUserProjects: (id) => dispatch(getUserProjects(id)),
  createProject: (data, id) => dispatch(createProject(data, id)),
  getUserRequest: (id) => dispatch(getUserRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);