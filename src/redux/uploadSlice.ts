import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the state of the upload form.
 * Contains properties for the name, description, attributes, media file,
 * and flags for upload status and form submission.
 */
interface UploadState {
  name: string; // Name of the item to be uploaded
  description: string; // Description of the item
  attributes: string; // Attributes associated with the item
  media: File | null; // Media file to be uploaded (e.g., image, video)
  isUploading: boolean; // Flag indicating if the upload is in progress
  isFormSubmitted: boolean; // Flag indicating if the form has been submitted
}

/**
 * Initial state for the upload slice.
 * Represents an empty form with no media, and flags set to their default values.
 */
const initialState: UploadState = {
  name: '',
  description: '',
  attributes: '',
  media: null,
  isUploading: false,
  isFormSubmitted: false,
};

/**
 * Redux slice to manage the upload form state.
 * Handles actions for setting form fields and tracking upload status.
 */
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    /**
     * Action to set the name of the item to be uploaded.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<string>} action - The payload contains the new name.
     */
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    /**
     * Action to set the description of the item to be uploaded.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<string>} action - The payload contains the new description.
     */
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    /**
     * Action to set the attributes of the item to be uploaded.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<string>} action - The payload contains the new attributes.
     */
    setAttributes: (state, action: PayloadAction<string>) => {
      state.attributes = action.payload;
    },

    /**
     * Action to set the media file to be uploaded.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<File | null>} action - The payload contains the new media file or null.
     */
    setMedia: (state, action: PayloadAction<File | null>) => {
      state.media = action.payload;
    },

    /**
     * Action to set the upload status.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<boolean>} action - The payload contains the new upload status.
     */
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },

    /**
     * Action to set the form submission status.
     * 
     * @param {UploadState} state - The current state of the upload slice.
     * @param {PayloadAction<boolean>} action - The payload contains the new submission status.
     */
    setIsFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

// Export actions generated by the slice
export const {
  setName,
  setDescription,
  setAttributes,
  setMedia,
  setIsUploading,
  setIsFormSubmitted,
} = uploadSlice.actions;

// Export the reducer to be added to the store
export default uploadSlice.reducer;
