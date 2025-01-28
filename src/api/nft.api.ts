import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Interface for the media object associated with the NFT.
 */
interface Media {
  _id: string;
  filename: string;
  fileUrl: string;
  filetype: string;
}

/**
 * Interface for the NFT object.
 * Describes the structure of an NFT, including metadata and media.
 */
interface NFT {
  _id: string;
  name: string;
  description: string;
  attributes: string;
  media: Media;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for the response when fetching NFTs with pagination.
 */
interface PaginatedNFTResponse {
  nfts: NFT[]; // List of NFTs for the current page
  totalCount: number; // Total number of NFTs
  currentPage: number; // The current page number
  totalPages: number; // Total number of pages
}

/**
 * Interface for the response when creating an NFT.
 */
interface CreateNFTResponse {
  message: string; // Success or error message
  nft: NFT; // The created NFT object
}

/**
 * NFT API service using Redux Toolkit Query.
 * Provides endpoints for creating and fetching NFTs.
 */
export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/nft/', 
    /**
     * Prepare headers for each request, adding the Authorization token if available.
     * 
     * @param {Headers} headers - The current headers of the request.
     * @param {any} param1 - Contains the getState function to access the Redux state.
     * @returns {Headers} - The updated headers.
     */
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth.accessToken; // Accessing the token from the Redux state
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /**
     * Endpoint for creating a new NFT.
     * Sends the NFT data (including media) to the server to create a new NFT.
     * 
     * @param {FormData} formData - The FormData object containing the NFT metadata and media file.
     * @returns {CreateNFTResponse} - The response object containing a success message and the created NFT.
     */
    createNFT: builder.mutation<CreateNFTResponse, FormData>({
      query: (formData) => ({
        url: 'create',
        method: 'POST',
        body: formData,
      }),
    }),

    /**
     * Endpoint for retrieving NFTs with pagination.
     * Fetches a list of NFTs based on the page and limit parameters.
     * 
     * @param {object} params - An object containing pagination parameters.
     * @param {number} params.page - The page number to fetch.
     * @param {number} params.limit - The number of NFTs to fetch per page.
     * @returns {PaginatedNFTResponse} - The response object containing a paginated list of NFTs.
     */
    getNFTs: builder.query<PaginatedNFTResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `nfts?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useCreateNFTMutation, useGetNFTsQuery } = nftApi;
