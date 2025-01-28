import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

interface NFTDrawerProps {
  open: boolean;
  selectedNFT: any;
  onClose: () => void;
}

const NFTDrawer: React.FC<NFTDrawerProps> = ({ open, selectedNFT, onClose }) => {
  if (!selectedNFT) return null;

  // Parse attributes (comma-separated string) and split into an array of attributes
  const attributes = selectedNFT?.attributes
    ? selectedNFT.attributes.split(',').map((attr: string) => attr.trim())
    : [];

  // Format the creation date using dayjs
  const creationDate = dayjs(selectedNFT?.createdAt).format('MMMM D, YYYY, h:mm A');

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          height: 'auto',
          backgroundColor: '#f9f9f9',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Two-column layout: Left side for Media, Right side for Information */}
      <Grid container spacing={2}>
        {/* Left Column for Media (Image or Video) */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
            }}
          >
            {selectedNFT?.media?.filetype.includes('image') ? (
              <img
                src={'http://localhost:3000/' + selectedNFT?.media?.fileUrl}
                alt={selectedNFT?.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            ) : selectedNFT?.media?.filetype.includes('video') ? (
              <video width="100%" controls>
                <source src={'http://localhost:3000/' + selectedNFT?.media?.fileUrl} type={selectedNFT?.media?.filetype} />
              </video>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Unsupported Media Type
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Right Column for NFT Information */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {selectedNFT?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedNFT?.description}
              </Typography>

              {/* Display Attributes */}
              {attributes.length > 0 && (
                <>
                  <Typography variant="body1" color="text.primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Attributes:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {attributes.map((attribute: string, index: number) => (
                    <Typography key={index} variant="body2">
                      {attribute}
                    </Typography>
                    ))}
                  </Box>

                </>
              )}

              {/* Display Creation Date */}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Created On: {creationDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default NFTDrawer;
