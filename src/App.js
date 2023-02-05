import React, {useEffect} from "react"
import './App.css';
import Layout from './Layout/Layout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { getCurrentUser } from './Redux/User/UserAction';

const theme = createTheme({
  // typography: {
  //   body1:{
  //     fontFamily: ["Motserrat", "sans-serif"].join(","),

  //   }
  // },
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       height: 40,
  //     },
  //   },


  // },
  breakpoints: {
    values: {
      xs: 0,
      ms: 479,
      sm: 600,
      md: 1090,
      lg: 1200,
      fl: 1350,
      xl: 1556,
    },
  }
});

function App({getCurrentUser}) {
  let uid = localStorage.getItem('uid');

  useEffect(() => {
    if (uid) {
        getCurrentUser(uid);
    }
}, [])

  return (
    <ThemeProvider theme={theme} >
      <Layout />
    </ThemeProvider>
  );
}

const mapStateToProps = (store) => ({
  reduxLoading: store.user.loading
});


const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (id) => dispatch(getCurrentUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
