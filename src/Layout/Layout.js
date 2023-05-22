import React from 'react'
import Routes from '../Routes/Routes';
// import { useTheme, useMediaQuery } from "@mui/material/";

const Layout = ({toggleTheme,theme}) => {
    // const theme = useTheme();

    

    return (
        <React.Fragment>
            <Routes toggleTheme={toggleTheme} theme={theme} />
        </React.Fragment>
    )
}

export default Layout