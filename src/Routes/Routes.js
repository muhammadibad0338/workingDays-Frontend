import React from 'react'
import { Routes, Route, } from "react-router-dom";
import PublicRoute from './PublicRoutes';
import { withRouter } from './WithRouter'
import ProtectedRoutes from './ProtectedRoutes';
//screens
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import Team from '../Screens/Team/Team';




const routesArr = [
    {
        path: "/",
        Component: Dashboard,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/signup",
        Component: Signup,
    },
    {
        path: "/team",
        Component: Team ,
    },
]
const AuthRoutesArr = [
    {
        path: "/",
        Component: Dashboard,
    },
    
]


const routes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            {
                routesArr.map(({ path, Component }) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            // element={<PublicRoute component={Component} />}
                            element={<ProtectedRoutes component={Component} />}
                        />
                    )
                })
            }
        </Routes>
    )
}

export default withRouter(routes)