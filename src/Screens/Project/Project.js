// import React, { useState } from 'react';
// import {
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     TablePagination,
//     Box,
//     CircularProgress,
//     Chip,
//     NativeSelect,
//     InputBase,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
// } from "@mui/material";
// import MuiDrawer from '@mui/material/Drawer';
// import { styled } from '@mui/system';
// import { makeStyles, withStyles } from "@mui/styles";
// import CustomDrawer from '../../Components/CustomDrawer';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 260;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });



// // const Drawer = styled(CustomDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// //     ({ theme, open }) => ({
// //         width: drawerWidth,
// //         flexShrink: 0,
// //         whiteSpace: 'nowrap',
// //         boxSizing: 'border-box',
// //         ...(open && {
// //             ...openedMixin(theme),
// //             '& .MuiDrawer-paper': openedMixin(theme),
// //         }),
// //         ...(!open && {
// //             ...closedMixin(theme),
// //             '& .MuiDrawer-paper': closedMixin(theme),
// //         }),
// //     }),
// // );
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//       width: drawerWidth,
//       flexShrink: 0,
//       whiteSpace: 'nowrap',
//       boxSizing: 'border-box',
//       ...(open && {
//         ...openedMixin(theme),
//         '& .MuiDrawer-paper': openedMixin(theme),
//       }),
//       ...(!open && {
//         ...closedMixin(theme),
//         '& .MuiDrawer-paper': closedMixin(theme),
//       }),
//     }),
//   );


// const Project = () => {
//     const [isDrawerOpen, setIsDrawerOpen] = useState(true)

//     const toggleDrawer = () => {
//         setIsDrawerOpen(!isDrawerOpen)
//     }

//     return (
//         <>
//             <Drawer open={isDrawerOpen} toggleDrawer={toggleDrawer}  drawerVariant='permanent'  >
//                 <List  >
//                     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                         <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                             <ListItemButton
//                                 sx={{
//                                     minHeight: 48,
//                                     justifyContent: isDrawerOpen ? 'initial' : 'center',
//                                     px: 2.5,
//                                 }}
//                             >
//                                 <ListItemIcon
//                                     sx={{
//                                         minWidth: 0,
//                                         mr: isDrawerOpen ? 3 : 'auto',
//                                         justifyContent: 'center',
//                                     }}
//                                 >
//                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//             <Button style={{marginLeft:'300px'}} onClick={toggleDrawer} >toggle</Button>
//         </> 
//     )
// }

// export default Project

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

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    marginTop:"72px"
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
    marginTop:"72px"
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

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}

            <Drawer variant="permanent" open={!open}  >
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: !open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: !open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Button onClick={() => setOpen(!open)} >toggle</Button>

            </Box>
        </Box>
    );
}
