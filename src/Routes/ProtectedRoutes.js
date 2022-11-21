import React from 'react'
import Login from '../Screens/Login/Login'
import ResponsiveAppbar from '../Components/ResponsiveAppbar'
import { connect } from "react-redux";

const ProtectedRoutes = ({ component: Component, currentUser }) => {
    console.log(localStorage.getItem('token'), "token check")
    if (localStorage.getItem('token')) {
        return (
            <>
                <ResponsiveAppbar currentUser={currentUser} />
                <Component />
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