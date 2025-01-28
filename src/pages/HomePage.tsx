import React from 'react';
import Home from '../components/Home';

interface SignUpProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const HomePage: React.FC<SignUpProps> = ({ isDarkMode, toggleTheme }) => {
  return <Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
};

export default HomePage;
