import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// import { StylesProvider } from "@mui/styles"
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import Routes from "./routes";
import axiosInstance from "./axois";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#e8e9eb',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const App = () => {
  const customization = useSelector((state) => state.customization);
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleTabClosing);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleTabClosing);
    };
  });

  const handleTabClosing = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.remember) {
      axiosInstance.post("user/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      console.log("Removing.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  };

  const alertUser = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  console.log(process.env.PUBLIC_URL);

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={themes(customization)}>
        {/* <CssBaseline /> */}
        <Router basename={process.env.PUBLIC_URL}>
          <Routes />
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
