import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import { createTheme, ThemeProvider } from "@mui/material/styles";


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

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Layout />
    </ThemeProvider>
  );
}

export default App;
