import React from 'react'
import {
    Menu,
    MenuItem,
    Typography,
    ListItemText,
    Box,
    Tooltip,
    Avatar
} from "@mui/material";
import { styled, alpha } from '@mui/system';

// const StyleMenu = styled(Menu)(({ theme }) => ({
//     marginTop:"45px"
// }));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        // minWidth: 180,
        marginTop: '45px',
        width: '250px',
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ProfileMenu = ({ anchorElUser, handleCloseUserMenu, options, currentUser }) => {
    return (
        <StyledMenu
            // sx={{ mt: '45px' }}
            // id="menu-appbar"
            id="account-menu"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}

            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem  >
                <Typography style={{ fontWeight: 'bold' }} >ACCOUNT</Typography>
            </MenuItem>
            <Box p={2} style={{display:'flex'}} >
                <Tooltip >
                    <Avatar alt={currentUser?.name} src="/static/images/avatar/2.jpg" />
                </Tooltip>
                <Box ml={1} >
                    <Typography style={{fontSize:'13px'}} >{currentUser?.name} </Typography>
                    <Typography style={{fontSize:'13px'}} >{currentUser?.email} </Typography>
                </Box>
            </Box>
            {options.map((option) => (
                <MenuItem key={option} onClick={() => {
                    handleCloseUserMenu()
                    option?.fncn()
                }}   >
                    <Typography textAlign="center" > {option?.name} </Typography>
                </MenuItem>
            ))}
        </StyledMenu>
    )
}

export default ProfileMenu