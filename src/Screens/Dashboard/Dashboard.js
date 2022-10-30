import React from 'react'
import { connect } from "react-redux";


const Dashboard = ({currentUser}) => {
  return (
    <div>Welcome {currentUser?.name}</div>
  )
}

//Redux Action
const mapStateToProps = (store) => ({
  reduxLoading: store.user.loading,
  currentUser: store.user.user
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);