import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Container, Typography, CircularProgress, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setDescription, setAttributes, setMedia, setIsUploading, setIsFormSubmitted } from '../redux/uploadSlice';
import { useCreateNFTMutation } from '../api/nft.api';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify'; 

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { name, description, attributes, media, isUploading, isFormSubmitted } = useSelector(
    (state: RootState) => state.upload
  );

  const [createNFT] = useCreateNFTMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null); 

  const handleFormSubmit = async () => {
    if (!name || !description || !attributes || !media) {
      alert('Please fill in all fields and upload a media file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('attributes', attributes);
    formData.append('media', media);

    dispatch(setIsUploading(true));

    try {
      const response = await createNFT(formData).unwrap();
      dispatch(setIsUploading(false));
      dispatch(setIsFormSubmitted(true));
      
      dispatch(setName(''));
      dispatch(setDescription(''));
      dispatch(setAttributes(''));
      dispatch(setMedia(null));
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  
      }

      toast.success(response.message);
    } catch (error) {
      dispatch(setIsUploading(false));
      toast.error('Failed to upload the metadata and media.');
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setMedia(file));
    }
  };

  const handleClearFile = () => {
    dispatch(setMedia(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Metadata and Upload Media
      </Typography>

      <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Metadata Creation
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Attributes (comma separated)"
          variant="outlined"
          fullWidth
          value={attributes}
          onChange={(e) => dispatch(setAttributes(e.target.value))}
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Upload Media (Image/Video)
        </Typography>

        {/* Media file upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ marginBottom: 2 }}
        />

        {/* Display the selected file name only if a file is selected */}
        {media ? (
          <Typography variant="body2" color="textSecondary">{media.name}</Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
        )}

        {/* Submit button */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            disabled={isUploading}
            fullWidth
          >
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit'
            )}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
