import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface defining the shape of the authentication state in the Redux store.
 * Includes user information, tokens, and errors related to authentication.
 */
interface AuthState {
  email: string; 
  password: string; 
  name: string; 
  confirmPassword: string;
  accessToken: string | null; 
  refreshToken: string | null;
  user: { name: string; email: string } | null; 
  errors: { [key: string]: string }; 
  serverError: string | null;
}

/**
 * Initial state for the authentication slice.
 * Represents an empty form state with no user logged in and no errors.
 */
const initialState: AuthState = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  accessToken: null,
  refreshToken: null,
  user: null,
  errors: {},
  serverError: null,
};

/**
 * Redux slice to manage authentication state.
 * This slice handles user login, logout, form validation errors, and server-side errors.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action to set authentication data (tokens and user).
     * 
     * @param {AuthState} state - The current state of the auth slice.
     * @param {PayloadAction} action - The payload contains accessToken, refreshToken, and user data.
     */
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: { name: string; email: string };
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },

    /**
     * Action to set validation errors for form fields.
     * 
     * @param {AuthState} state - The current state of the auth slice.
     * @param {PayloadAction} action - The payload contains field and error message.
     */
    setValidationError: (
      state,
      action: PayloadAction<{ field: string; message: string }>
    ) => {
      state.errors[action.payload.field] = action.payload.message;
    },

    /**
     * Action to clear all validation errors.
     * 
     * @param {AuthState} state - The current state of the auth slice.
     */
    clearValidationErrors: (state) => {
      state.errors = {}; // Clear previous validation errors
    },

    /**
     * Action to set a server error message.
     * 
     * @param {AuthState} state - The current state of the auth slice.
     * @param {PayloadAction} action - The payload contains the error message or null to clear the error.
     */
    setServerError: (state, action: PayloadAction<string | null>) => {
      state.serverError = action.payload;
    },

    /**
     * Action to logout the user by clearing authentication tokens and user data.
     * 
     * @param {AuthState} state - The current state of the auth slice.
     */
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.errors = {};
      state.serverError = null;
    },

    /**
     * Action to update form data (email, password, and optionally name and confirmPassword).
     * 
     * @param {AuthState} state - The current state of the auth slice.
     * @param {PayloadAction} action - The payload contains the form data (email, password, name, confirmPassword).
     */
    setFormData: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        name?: string;
        confirmPassword?: string;
      }>
    ) => {
      const { email, password, name, confirmPassword } = action.payload;
      state.email = email;
      state.password = password;
      if (name) state.name = name;
      if (confirmPassword) state.confirmPassword = confirmPassword;
    },
  },
});


export const {
  setAuthData,
  setValidationError,
  clearValidationErrors,
  setServerError,
  logout,
  setFormData, 
} = authSlice.actions;

export default authSlice.reducer;
