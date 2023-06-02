import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from '@mui/icons-material/Task';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles, withStyles } from "@mui/styles";
import State from "../../../State/Project.json"
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { connect } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { color } from '@mui/system';



const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
        
    },
    iconButton: {
        width: '30px',
        height: '30px',
        
    },
    iconButtonCntnr: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'end',
        // backgroundColor:'red'
    }
}));


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    marginTop: "72px",
    backgroundColor: theme.palette.primary.main,
    borderRight: theme.palette.type == "light" ? '1px solid #BDBDBD' : '1px solid #0095FF'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    marginTop: "72px",
    backgroundColor: theme.palette.primary.main,
});




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const ColorBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}))

const ColorToggleListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.headTypography.main
    // color:'aqua !important'

}));

const ColorToggleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.headTypography.main
    // color:'aqua !important'
}));

const ProjectDetailBox = styled(Box)(({ theme }) => ({
    borderBottom: theme.palette.type == "light" ? '1px solid #BDBDBD' : '1px solid #0095FF'
}));

function MiniDrawer({ Component, projectDetails }) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [drawerIndex, setDrawerIndex] = useState(0)

    let { id } = useParams();
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let drawerRoutes = [
        {
            name: 'Board',
            Icon: LeaderboardIcon,
            path: `/project/${id}`
        },
        {
            name: 'Task Dependency',
            Icon: TaskIcon,
            path: `/project/${id}/taskDependency`
        },
        {
            name: 'Project Tree',
            Icon: AccountTreeIcon,
            path: `/project/${id}/tree`
        },
        // {
        //     name: 'Project Setting',
        //     Icon: SettingsIcon
        // }
    ]

    return (
        <ColorBox
            sx={{ display: '-webkit-box', minHeight: `calc(100vh - 72px)` }}
        >
            {/* <CssBaseline /> */}

            <Drawer variant="permanent" open={!open}   >
                {/* <Divider /> */}
                <Box py={1} className={classes.iconButtonCntnr} >
                    <IconButton  className={classes.iconButton} onClick={() => setOpen(!open)} >
                        <ColorToggleText >
                            {open ? <KeyboardArrowRightIcon  /> : <KeyboardArrowLeftIcon />}
                        </ColorToggleText>
                    </IconButton >
                </Box>
                <ProjectDetailBox px={3} pb={2} style={{ display: 'flex' }} >
                    <img src={projectDetails?.icon} className={classes.projectIcon} />
                    <div>
                        <ColorToggleText>{projectDetails?.name} </ColorToggleText>
                        <ColorToggleText style={{ fontSize: '12px' }} >Software project</ColorToggleText>
                    </div>
                </ProjectDetailBox>
                <Divider />
                <List>
                    {drawerRoutes.map(({ name, Icon, path }, index ,) => (
                        <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    // borderLeft: `${drawerIndex === index ? '5px solid #0096FF' : "none"}`
                                    backgroundImage: `${drawerIndex === index ? 'linear-gradient(rgba(76, 207, 248, 1), rgba(74, 75, 227, 1),rgba(35, 52, 156, 1))' : "none"}` ,
                                    
                                }}
                                onClick={() => {
                                    navigate(path)
                                    setDrawerIndex(index)
                                    
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        
                                        minWidth: 0,
                                        mr: !open ? 3 : 'auto',
                                        justifyContent: 'center', 
                                        
                                    }}
                                >
                                    <ColorToggleText  >
                                        <Icon sx={{ opacity: !open ? 1 : 0,color: `${drawerIndex === index ? 'white' : "none"}` }} />
                                    </ColorToggleText>
                                </ListItemIcon >
                                <ColorToggleListItemText primary={name} sx={{ opacity: !open ? 1 : 0,color: `${drawerIndex === index ? 'white' : "none"}` }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                sx={{ flexGrow: 1, p: 1 }}
            >
                <Component />
            </Box>
        </ColorBox >
    );
}
//Redux Action
const mapStateToProps = (store) => ({
    reduxUserLoading: store.project.loading,
    currentUser: store.user.user,
    searchUser: store.user.searchUser,
    projectDetails: store.project.projectDetails
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);