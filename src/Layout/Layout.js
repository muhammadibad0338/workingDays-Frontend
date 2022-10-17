import React from 'react'
import Routes from '../Routes/Routes';
import { useTheme, useMediaQuery } from "@mui/material/";

const Layout = () => {
    const theme = useTheme();


    return (
        <React.Fragment>
            {/* <NavBar /> */}
            <Routes />
        </React.Fragment>
    )
}

export default Layout