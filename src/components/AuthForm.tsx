import React, { useEffect } from 'react';
import { TextField, Button, Typography, Box, Container, CircularProgress } from '@mui/material';  // <-- Import CircularProgress
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, setValidationError, clearValidationErrors, setServerError, setFormData } from '../redux/authSlice'; 
import { useLoginMutation, useSignUpMutation } from '../api/auth.api'; 
import { RootState } from '../redux/store'; 
import { toast } from 'react-toastify'; 

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, name, confirmPassword, errors, serverError } = useSelector(
    (state: RootState) => state.auth
  );

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();

  const validateForm = () => {
    dispatch(clearValidationErrors()); 

    let isValid = true;

    if (!email) {
      dispatch(setValidationError({ field: 'email', message: 'Email is required' }));
      isValid = false;
    }

    if (!password) {
      dispatch(setValidationError({ field: 'password', message: 'Password is required' }));
      isValid = false;
    }

    if (type === 'signup') {
      if (!name) {
        dispatch(setValidationError({ field: 'name', message: 'Name is required' }));
        isValid = false;
      }
      if (password !== confirmPassword) {
        dispatch(setValidationError({ field: 'confirmPassword', message: 'Passwords do not match' }));
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      let response;
      if (type === 'login') {
        response = await login({ email, password }).unwrap();
      } else {
        response = await signUp({ name, email, password }).unwrap();
      }
      if (response?.accessToken && response?.user) {
        dispatch(setAuthData({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user, 
        }));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home'); 
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const isLoading = loginLoading || signUpLoading;

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 3,
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          {type === 'login' ? 'Login' : 'Sign Up'}
        </Typography>

        {/* Name field is only shown for Sign Up */}
        {type === 'signup' && (
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => dispatch(setFormData({ name: e.target.value, email, password, confirmPassword }))}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
        )}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => dispatch(setFormData({ email: e.target.value, password, name, confirmPassword }))}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => dispatch(setFormData({ password: e.target.value, email, name, confirmPassword }))}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />

        {/* Confirm Password is only shown for Sign Up */}
        {type === 'signup' && (
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => dispatch(setFormData({ confirmPassword: e.target.value, email, password, name }))}
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={isLoading} 
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" /> 
          ) : (
            type === 'login' ? 'Login' : 'Sign Up'  
          )}
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <Button color="primary" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button color="primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            </>
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthForm;
