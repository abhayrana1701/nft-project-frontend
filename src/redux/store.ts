import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth.api';
import authReducer from './authSlice'; 
import uploadReducer from './uploadSlice';
import { nftApi } from '../api/nft.api';
import nftReducer from './nftSlice';

/**
 * Configures the Redux store.
 * Combines reducers for authentication, file upload, and NFTs APIs.
 * Adds middleware for handling API requests and caching.
 * 
 * @returns {Store} The configured Redux store.
 */
const store = configureStore({
  reducer: {
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer, 
    upload: uploadReducer,
    [nftApi.reducerPath]: nftApi.reducer,
    nfts: nftReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware).concat(nftApi.middleware), 
});

export default store;

/**
 * RootState type representing the overall state of the store.
 * Can be used for type-safe access to the Redux state.
 * 
 * @type {RootState}
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type representing the dispatch function for the store.
 * Can be used for type-safe dispatch of actions.
 * 
 * @type {AppDispatch}
 */
export type AppDispatch = typeof store.dispatch;
