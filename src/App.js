// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Home from './pages/Dashboard';
import Profile from './pages/Profile';
import LoginPage from './pages/Login';
import { QueryClient, QueryClientProvider } from 'react-query';


const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = new QueryClient();


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <QueryClientProvider client={queryClient}>
        {isLoggedIn ? (
          <div style={{ display: 'flex' }}>
            <Sidebar onLogout={handleLogout} />
            <div style={{ flex: 1, paddingLeft: '250px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        )}
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
