import React from 'react'
import { Routes, Route, } from "react-router-dom";
import { withRouter } from './WithRouter'
import ProtectedRoutes from './ProtectedRoutes';
//screens
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import Team from '../Screens/Team/Team';
import Project from '../Screens/Project/Project';
import Board from '../Screens/Project/Components/Board';
import ProjectTree from '../Screens/ProjectTree/ProjectTree';
import Profile from '../Screens/Profile/Profile';




const routesArr = [
    {
        path: "/",
        Component: Dashboard,
        projectDrawer: false
    },
    {
        path: "/login",
        Component: Login,
        projectDrawer: false
    },
    {
        path: "/signup",
        Component: Signup,
        projectDrawer: false
    },
    {
        path: "/team",
        Component: Team,
        projectDrawer: false
    },
    {
        path: "/profile",
        Component: Profile,
        projectDrawer: false
    },
    {
        path: "/project/:id",
        Component: Project,
        projectDrawer: true,
        nestedRoutes: [
            {
                path: '/borad',
                Component: Board
            }
        ]
    },
    {
        path: "/project/:id/tree",
        Component: ProjectTree,
        projectDrawer: true,
    },
]


const routes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {
                routesArr.map(({ path, Component, nestedRoutes, projectDrawer }) => {
                    return (
                        <>
                            <Route
                                key={path}
                                path={path}
                                element={<ProtectedRoutes component={Component} projectDrawer={projectDrawer} />}
                            />
                        </>
                    )
                })
            }
        </Routes>
    )
}

export default withRouter(routes)