import React from 'react'
import {
    Menu,
    MenuItem,
    Typography,
    ListItemText
} from "@mui/material";

const ProfileMenu = ({anchorElUser,handleCloseUserMenu,options,currentUser}) => {
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
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
            {options.map((option) => (
                <MenuItem key={option} onClick={handleCloseUserMenu}   >
                    <Typography textAlign="center" > {option} </Typography>
                </MenuItem>
            ))}
        </Menu>
    )
}

export default ProfileMenu