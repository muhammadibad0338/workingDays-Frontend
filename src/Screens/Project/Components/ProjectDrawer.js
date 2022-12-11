import * as React from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles, withStyles } from "@mui/styles";
import State from "../../../State/Project.json"
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
    projectIcon: {
        height: '30px',
        width: '30px',
        borderRadius: '2px',
        marginRight: '15px'
    },
}));


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    marginTop: "72px"
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
    marginTop: "72px"
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

export default function MiniDrawer({ Component }) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
        },
        {
            name: 'Project Tree',
            Icon: AccountTreeIcon
        },
        {
            name: 'Project Setting',
            Icon: SettingsIcon
        }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}

            <Drawer variant="permanent" open={!open}  >
                {/* <Divider /> */}
                <Box px={3} py={3} style={{ display: 'flex' }} >
                    <img src={State.projects[0].image} className={classes.projectIcon} />
                    <div>
                        <Typography>Splitgate</Typography>
                        <span style={{ fontSize: '12px' }} >Software project</span>
                    </div>
                </Box>
                <Divider />
                <List>
                    {drawerRoutes.map(({ name, Icon }, index) => (
                        <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: !open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={name} sx={{ opacity: !open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Button onClick={() => setOpen(!open)} >toggle</Button>
                <Component />
            </Box>
        </Box>
    );
}
