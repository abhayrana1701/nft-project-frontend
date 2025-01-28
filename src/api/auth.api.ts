import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Interface for the login request payload.
 */
interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interface for the signup request payload.
 */
interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Interface for the authentication response object.
 */
interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: { name: string; email: string };
}

/**
 * Auth API service using Redux Toolkit Query.
 * Provides endpoints for login and signup.
 */
export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }), 
  endpoints: (builder) => ({
    /**
     * Endpoint for user login.
     * Sends the login request with the user's email and password.
     * 
     * @param {LoginRequest} loginRequest - The login request payload containing email and password.
     * @returns {AuthResponse} - The response object containing authentication details and user info.
     */
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (loginRequest) => ({
        url: 'users/login',
        method: 'POST',
        body: loginRequest,
      }),
    }),

    /**
     * Endpoint for user signup.
     * Sends the signup request with the user's name, email, and password.
     * 
     * @param {SignUpRequest} signUpRequest - The signup request payload containing name, email, and password.
     * @returns {AuthResponse} - The response object containing authentication details and user info.
     */
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (signUpRequest) => ({
        url: 'users/register',
        method: 'POST',
        body: signUpRequest,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
