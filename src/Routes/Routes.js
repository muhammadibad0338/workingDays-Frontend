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
import TaskDependency from '../Screens/TaskDependency/TaskDependency';
import AddTaskDependency from '../Screens/TaskDependency/AddTaskDependency/AddTaskDependency';
import ProjectReport from '../Screens/ProjectReport/ProjectReport';
import EditTaskDependency from '../Screens/TaskDependency/EditTaskDependency/EditTaskDependency';
import DeleteTaskDependency from '../Screens/TaskDependency/DeleteTaskDependency/DeleteTaskDependency';




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

    },
    {
        path: "/project/:id/tree",
        Component: ProjectTree,
        projectDrawer: true,
    },
    {
        path: "/project/:id/taskDependency",
        Component: TaskDependency,
        projectDrawer: true,
    },
    {
        path: "/project/:id/report",
        Component: ProjectReport,
        projectDrawer: true,
    },
    {
        path: "/project/:id/taskDependency/addTaskDependency",
        Component: AddTaskDependency,
        projectDrawer: true,
    },
    {
        path: "/project/:id/taskDependency/editTaskDependency",
        Component: EditTaskDependency,
        projectDrawer: true,
    },
    {
        path: "/project/:id/taskDependency/deleteTaskDependency",
        Component: DeleteTaskDependency,
        projectDrawer: true,
    },
]


const routes = ({ toggleTheme, theme }) => {
    return (
        <Routes>
            <Route   path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {
                routesArr.map(({ path, Component, projectDrawer }, ind) => {
                    return (
                        <Route
                            key={ind}
                            path={path}
                            element={<ProtectedRoutes component={Component} projectDrawer={projectDrawer} toggleTheme={toggleTheme} theme={theme} />}
                        />
                    )
                })
            }
        </Routes>
    )
}

export default routes