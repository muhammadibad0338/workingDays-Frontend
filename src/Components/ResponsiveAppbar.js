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

//Components
import ProfileMenu from './ProfileMenu';

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
    }
}));

const pages = ['Your Work', 'Team', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppbar = ({ currentUser }) => {
    //calling css classes
    const classes = useStyles();
    //state
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


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
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#5800FF' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}

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
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"  >{page}</Typography>

                                </MenuItem>
                            ))}
                        </Menu>
                        <img src={Logo} />
                    </Box>

                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
                    {/* <img src={Logo} className={classes.mdDownLogo} /> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', fontSize: 'inherit' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={currentUser.name} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <ProfileMenu
                            anchorElUser={anchorElUser}
                            handleCloseUserMenu={handleCloseUserMenu}
                            options={settings}
                            currentUser={currentUser}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default ResponsiveAppbar