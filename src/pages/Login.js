import React, { useState } from "react";
import { Box, TextField, Button, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLogin } from "../api";

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error message
  const loginUser = useLogin();
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = async () => {
    console.log("Attempting login...");
    try {
      const data = await loginUser({ identifier, password });
      console.log("Login successful: loginpage", data);
      onLogin(data);
      navigate("/"); // Use navigate to redirect to the home page
    } catch (error) {
      console.error("Login failed:", error);
      setError("Incorrect username or password"); // Set error message
    }
  };

  const handleCloseSnackbar = () => {
    setError(null); // Clear error message when Snackbar is closed
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <TextField
        label="Username or Email"
        variant="outlined"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;
