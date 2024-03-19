import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Dashboard";
import Profile from "./pages/CreatePatient";
import LoginPage from "./pages/Login";
import Medicines from "./pages/Medicines";
import Patient from "./pages/Patient";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUsers } from "./api";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const theme = createTheme();

function App() {
  const [appState, setAppState] = useState({
    isLoggedIn: false,
    snackbar: {
      open: false,
      message: "",
      severity: "success",
    },
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    const checkAuthentication = async () => {
      const storedAuth = localStorage.getItem("isLoggedIn");
      if (storedAuth) {
        setAppState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
        }));
      }
    };

    checkAuthentication();
  }, []); // Run this effect only once, when the component mounts

  const handleLogin = async (loginData) => {
    try {
      const users = await getUsers();
      const matchedUser = users.find(
        (user) => user.username === loginData?.user.username
      );
      if (matchedUser) {
        setAppState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
          snackbar: {
            open: true,
            message: "Login successful",
            severity: "success",
          },
        }));
        localStorage.setItem("isLoggedIn", "true"); // Store authentication status in local storage
      } else {
        setAppState((prevState) => ({
          ...prevState,
          snackbar: {
            open: true,
            message: "Incorrect username or password",
            severity: "error",
          },
        }));
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setAppState((prevState) => ({
        ...prevState,
        snackbar: {
          open: true,
          message: "An error occurred while logging in",
          severity: "error",
        },
      }));
    }
  };

  const handleLogout = () => {
    setAppState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
    localStorage.removeItem("isLoggedIn");
  };

  const handleCloseSnackbar = () => {
    setAppState((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        open: false,
      },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <QueryClientProvider client={queryClient}>
          {appState.isLoggedIn ? (
            <div
              style={{
                display: "flex",
                backgroundColor: " rgb(247, 249, 252)",
                height: "100vh",
              }}
            >
              <Sidebar onLogout={handleLogout} />
              <div style={{ flex: 1, paddingLeft: "250px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create-patient" element={<Profile />} />
                  <Route path="/patient/:id" element={<Patient />} />
                  <Route path="/medicines" element={<Medicines />} />
                </Routes>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
          )}
        </QueryClientProvider>
      </Router>
      <Snackbar
        open={appState.snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={appState.snackbar.severity}
        >
          {appState.snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
