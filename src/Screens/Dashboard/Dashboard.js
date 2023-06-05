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
  OutlinedInput,
  Divider
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
import Swal from "sweetalert2";
import dashboardBg from "../../Assets/Images/dashboardBg.jpg"


const ProjectHead = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
}));

const useStyles = makeStyles((theme) => ({
  spaceBtwn: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  spaceBtwn1: {
    display: 'flex',
    alignItems: 'flex-start'
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
    color: `${theme.palette.headTypography.main} !important `,
    border: `1px solid ${theme.palette.headTypography.main}`,
    outline: 'none',
    '&:hover': {
      outline: 'none',
      border: `1px solid ${theme.palette.headTypography.main}`,
    }
  },
  colorBox: {
    background: theme.palette.primary.main
  }

  , dashboardImg:
  {
    width: '100%',
    // minHeight: '100vh !important',
    height: '240px !important',
    backgroundImage: `url(${dashboardBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0px 10px 10px 10px !important'
  },
  IconButton: {
    backgroundImage: 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))',
    border: ' 2px solid #FFFFFF !important',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    width: '50px'
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
    if (credentials.name.trim().length == 0 || credentials.description.trim().length == 0) {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "error",
        title: "Working Days",
        html: `<strong><font color="black">Please fill all Fields </font></strong>`,
      });
    }
    else {
      createProject(credentials, uid)
    }
  }

  const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh'
  }));

  const ColorBoxTwo = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh'
  }));


  const ColorToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    border: `1px solid ${theme.palette.headTypography.main}`
  }));

  const ColorToggleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
  }));

  const ColorToggleButton = styled(ToggleButton)(({ theme }) => ({
    // backgroundColor: theme.palette.type == "light" ? '#E0E0E0' : '#2A435B',
    // '&:hover': {
    //   background:'none'
    // }
  }));



  return (
    <>
      <ColorBox>
        <div className={classes.dashboardImg}>
          <Container maxWidth='fl' >
            <Grid container >

              <Grid item xs={12} mt={4} className={classes.spaceBtwn} >

                <HeadingOne sx={{ color: 'white' }} title={`Hello ${currentUser?.name}!`} />

                {[0, 1, 2].includes(currentUser.level) && <ContainedBtn sx={{ border: '3px solid white' }} title='Create Project' onClick={() => setisDialogOpen(true)} />}
              </Grid>

              <Grid item xs={12} mt={2} className={classes.spaceBtwn1} >
                <HeadingOne btmText="Manage Your Project Load with ease using the powerful Working Days Project manager App" />
              </Grid>

              {/* <Grid item xs={12} >
            <SearchBar />
          </Grid> */}
              {/* <Grid item xs={12} className={classes.alignEnd} mt={10} >
              <ColorToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
              >
                <ColorToggleButton value="listView" aria-label="left aligned" sx={{ opacity: alignment === "listView" ? 1 : 0.3 }} >
                  <ColorToggleText>
                    <ListIcon />
                  </ColorToggleText>
                </ColorToggleButton>
                <ColorToggleButton value="gridView" aria-label="left aligned" sx={{ opacity: alignment === "gridView" ? 1 : 0.3 }} >
                  <ColorToggleText>
                    <GridViewIcon />
                  </ColorToggleText>
                </ColorToggleButton>
              </ColorToggleButtonGroup>
            </Grid> */}
              <Grid item xs={12} mt={10} >
                {/* {
                alignment === "gridView" ? <GridView /> : <ListView />
              } */}
                <ListView />
              </Grid>
            </Grid>
          </Container>
        </div>
      </ColorBox>
      <FullScreenDialog maxWidth='sm' fullWidth={true} open={isDialogOpen} hideDialogHandler={() => setisDialogOpen(false)} >
        <Box className={[classes.alignEnd, classes.colorBox]} px={2} pt={1} >
          <IconButton aria-label="Close" onClick={() => setisDialogOpen(false)} className={classes.IconButton} >
              <CloseIcon fontSize='large' sx={{ color: '#FFFFFF',  }}  />
          </IconButton>
        </Box>
        <Box px={2} className={classes.colorBox} >
          <ColorToggleText variant='h6' style={{ fontWeight: 'bold', }} >Create new project</ColorToggleText>
        </Box>
        <Divider sx={{ height: '1px', backgroundColor: '#21268C', mt: 2 }} />
        <Box p={2} className={classes.colorBox} >
          <Box my={2} style={{}} >
            {/* <Typography style={{ marginBottom: '-20px' }} >Project Name</Typography> */}
            <Box my={3} style={{ width: "100%" }}>
              <ColorToggleText style={{ fontSize: "12px", marginLeft: "3px" }}>
                Project Name
              </ColorToggleText>
              <OutlinedInput
                fullwidth
                required={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                placeholder="Project Name"
                type="text"
                value={credentials?.name}
                onChange={(e) => {
                  setcredentials({
                    ...credentials,
                    name: e.target.value,
                  });
                }}
              />
            </Box>
            <Box my={3} style={{ width: "100%" }}>
              <ColorToggleText style={{ fontSize: "12px", marginLeft: "3px" }}>
                Project Description
              </ColorToggleText>
              <OutlinedInput
                fullwidth
                required={true}
                rows={4}
                multiline={true}
                className={classes.productInput}
                style={{ width: "100%" }}
                placeholder="Description"
                type="text"
                value={credentials?.description}
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
    </>
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