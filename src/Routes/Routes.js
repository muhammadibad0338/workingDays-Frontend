import React from 'react'
import {Routes,Route, } from "react-router-dom";
//screens
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';


import { withRouter } from './WithRouter'

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
]


const routes = () => {
    return (
      <Routes>
          {
              routesArr.map(({path,Component})=>{
                  return(
                      <Route 
                          key={path}
                          path={path}
                          element={<PublicRoute component={Component}  />}
                      />
                  )
              })
          }
      </Routes>
    )
  }
  
  export default withRouter(routes)