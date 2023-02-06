import * as React from 'react';
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
    CircularProgress,
    ListItemText
} from "@mui/material";

import Logo from "../Assets/Images/Logo.png"

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { makeStyles, withStyles } from "@mui/styles"
import { Link, useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';

//Components
import ProfileMenu from './ProfileMenu';
import CustomDrawer from './CustomDrawer';
import Notification from '../Screens/Notification/Notification';

import lightIcon from "../Assets/Images/moon.png"
import darkIcon from "../Assets/Images/sun-bright.png"

// styling
const useStyles = makeStyles((theme) => ({
    mdUpLogo: {
        height: '60px',
        width: 'auto',
        [theme.breakpoints.down("md")]: {
            display: 'none'
        }
    },
    mdDownLogo: {
        height: 'fit-Content',
        width: 'auto',
        [theme.breakpoints.up("md")]: {
            display: 'none'
        }
    },
    modeToggleBtn: {
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
    },
}));


const pages = [
    {
        title: 'Your Work',
        path: "/"
    },
    {
        title: 'Team',
        path: "/team"
    },
    {
        title: 'Pricing',
        path: "/"
    },
];


const ResponsiveAppbar = ({ currentUser, toggleTheme, theme }) => {
    //calling css classes
    const classes = useStyles();
    //state
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    let navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const gotoProfile = () => {
        navigate('/profile')
    }
    const settings = [{ name: 'Profile', fncn: gotoProfile }, { name: 'Logout', fncn: logout }];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        // localStorage.clear()
        // navigate('/login')
    };

    const toggleNotificationDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return (
        <AppBar position="sticky" style={{ backgroundColor: '#5800FF' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <img src={Logo} className={classes.mdUpLogo} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => {
                                    navigate(`${page.path}`)
                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center"  >{page.title}</Typography>

                                </MenuItem>
                            ))}
                        </Menu>
                        <img src={Logo} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                // onClick={handleCloseNavMenu}
                                onClick={() => {
                                    navigate(`${page.path}`)
                                    handleCloseNavMenu()
                                }}
                                sx={{ my: 2, mx: 1, color: 'white', display: 'block', fontWeight: 'bold', fontSize: 'inherit' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile Menu">
                            <IconButton onClick={toggleNotificationDrawer} sx={{ pr: 2 }}>
                                <NotificationsIcon style={{ color: 'white' }} fontSize='medium' />
                            </IconButton>
                        </Tooltip>
                        <CustomDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleNotificationDrawer} drawerAnchor='right'   >
                            <Notification toggleNotificationDrawer={toggleNotificationDrawer} />
                        </CustomDrawer>
                        <Tooltip title="Profile Menu">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={currentUser.name} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <ProfileMenu
                            anchorElUser={anchorElUser}
                            handleCloseUserMenu={handleCloseUserMenu}
                            options={settings}
                            currentUser={currentUser}
                            toggleTheme={toggleTheme}
                            theme={theme}
                        />
                        {/* <button className={classes.modeToggleBtn} onClick={toggleTheme} >
                            <img src={theme === "light" ? lightIcon : darkIcon} alt="toggle Theme" style={{ height: '40px', width: '40px',marginLeft:'10px' }} />
                        </button> */}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default ResponsiveAppbar