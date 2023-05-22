import React, { useEffect } from "react"
import './App.css';
import Layout from './Layout/Layout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { getCurrentUser } from './Redux/User/UserAction';

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#f50057',
    },
    headTypography: {
      main: '#0A1929'
    },
    ticketBox: {
      main: '#EBECF0'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      ms: 479,
      sm: 600,
      nineS:900,
      md: 1090,
      lg: 1200,
      fl: 1350,
      xl: 1556,
    },
  }
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0A1929',
    },
    secondary: {
      main: '#f50057',
    },
    headTypography: {
      main: '#F3F6F9'
    },
    ticketBox: {
      main: '#001E3C'
    }
  },
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

function App({ getCurrentUser }) {
  let uid = localStorage.getItem('uid');
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    if (uid) {
      getCurrentUser(uid);
    }
  }, [])

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme} >
      <Layout toggleTheme={colorMode.toggleColorMode} theme={mode} />
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
