import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing a media item associated with an NFT.
 * Contains details about the file such as its name, URL, and type.
 */
interface Media {
  _id: string;
  filename: string;
  fileUrl: string;
  filetype: string;
}

/**
 * Interface representing an NFT (Non-Fungible Token).
 * Includes metadata about the NFT such as name, description, and media information.
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
 * Interface representing the state of NFTs in the Redux store.
 * Contains a list of NFTs, pagination data, and the total count of NFTs.
 */
interface NFTState {
  nfts: NFT[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

/**
 * Initial state for the NFTs slice.
 * Represents an empty state with no NFTs, and the pagination set to page 1.
 */
const initialState: NFTState = {
  nfts: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

/**
 * Redux slice to manage the state related to NFTs.
 * Handles actions for setting NFTs and updating the current page.
 */
const nftSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    /**
     * Action to set the list of NFTs and update pagination details.
     * 
     * @param {NFTState} state - The current state of the NFTs slice.
     * @param {PayloadAction<NFTState>} action - The payload contains the list of NFTs and pagination data.
     */
    setNFTs: (state, action: PayloadAction<NFTState>) => {
      state.nfts = action.payload.nfts;
      state.totalCount = action.payload.totalCount;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },

    /**
     * Action to update the current page of NFTs.
     * 
     * @param {NFTState} state - The current state of the NFTs slice.
     * @param {PayloadAction<number>} action - The payload contains the new current page number.
     */
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setNFTs, setPage } = nftSlice.actions;

export default nftSlice.reducer;
