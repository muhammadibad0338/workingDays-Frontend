import React from 'react'
import Login from '../Screens/Login/Login'

const ProtectedRoutes = ({ component: Component }) => {
    console.log(localStorage.getItem('token'),"token check")
    if (localStorage.getItem('token')) {
        return (
            <>
                <Component />
            </>
        )
    }
    else{
        return <Login/>
    }
}

export default ProtectedRoutes