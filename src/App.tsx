import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary';  
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Lazy loading the components
const Login = React.lazy(() => import('./pages/LoginPage'));
const SignUp = React.lazy(() => import('./pages/SignUpPage'));
const Home = React.lazy(() => import('./pages/HomePage'));
const Upload = React.lazy(() => import('./pages/UploadPage'));

// Import the ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set up the theme 
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: { main: isDarkMode ? '#388E3C' : '#4CAF50' },
        secondary: { main: isDarkMode ? '#81C784' : '#66BB6A' },
        background: {
          default: isDarkMode ? '#212121' : '#ffffff',
          paper: isDarkMode ? '#424242' : '#ffffff',
        },
        text: {
          primary: isDarkMode ? '#ffffff' : '#000000',
          secondary: isDarkMode ? '#b3b3b3' : '#616161',
        },
      },
    }), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToastContainer aria-label="" />
        <Container>
          {/* Wrap the entire Routes component in ErrorBoundary for global error handling */}
          <ErrorBoundary>
            {/* Wrap with Suspense to handle the loading state */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                
                {/* Protected route for Upload */}
                <Route 
                  path="/upload" 
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              
            </Suspense>
          </ErrorBoundary>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
