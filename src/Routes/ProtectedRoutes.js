import React from 'react'
import Login from '../Screens/Login/Login'
import ResponsiveAppbar from '../Components/ResponsiveAppbar'
import { connect } from "react-redux";
import ProjectDrawer from '../Screens/Project/Components/ProjectDrawer'

const ProtectedRoutes = ({ component: Component, currentUser, projectDrawer }) => {
    console.log(localStorage.getItem('token'), "token check")
    if (localStorage.getItem('token')) {
        return (
            <>
                <ResponsiveAppbar currentUser={currentUser} />
                { projectDrawer && <ProjectDrawer Component={Component} /> }
                { !projectDrawer && <Component />}
            </>
        )
    }
    else {
        return <Login />
    }
}


//Redux Action
const mapStateToProps = (store) => ({
    reduxLoading: store.user.loading,
    currentUser: store.user.user
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);