import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {removeFromLocalStorage} from '../utils/localStorage.util';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeFromLocalStorage('token');
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Media and Metadata Dashboard
      </Typography>
      <Button color="inherit" sx={{ ml: 2 }} onClick={handleLogout}>
        Logout
      </Button>
      <Button color="inherit" onClick={toggleTheme} sx={{ ml: 2 }} >
        Toggle Theme
      </Button>
    </Toolbar>
  </AppBar>
  );
};

export default Header;
