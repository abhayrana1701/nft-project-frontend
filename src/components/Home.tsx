import React, { useState, Suspense } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  CssBaseline,
  Pagination,
  Fab,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useGetNFTsQuery } from '../api/nft.api';
import Header from './Header'; 

// Lazy load NFTDrawer
const NFTDrawer = React.lazy(() => import('../components/NFTDrawer'));

interface HomeProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  const { data, error, isLoading, isError } = useGetNFTsQuery({ page, limit: 3 });

  const nfts = data?.nfts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleNFTClick = (nft: any) => {
    setSelectedNFT(nft);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedNFT(null);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>

        <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 3 }}>
          <Container>
            <Typography variant="h5" align="center" color="textSecondary" sx={{ mb: 4 }}>
              NFT Media Gallery
            </Typography>

            {/* Show loading spinner while data is being fetched */}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Show error if there's any */}
            {isError && error && (
              <Box sx={{ mt: 4 }}>
                <Alert severity="error">{(error as any).message || 'Something went wrong!'}</Alert>
              </Box>
            )}

            {/* NFT Display Area */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {nfts.map((nft) => (
                <Box
                  key={nft._id}
                  sx={{
                    width: 'calc(33.33% - 20px)',
                    minWidth: 250,
                    borderRadius: 2,
                    boxShadow: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent', // Set default border to transparent
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                      cursor: 'pointer',
                      borderColor: 'primary.main', // Change border color on hover to primary color
                    },
                  }}
                  onClick={() => handleNFTClick(nft)}
                >
                  {/* Media Display */}
                  <Box
                    sx={{
                      height: '200px',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    {nft.media.filetype.includes('image') ? (
                      <img
                        src={'http://localhost:3000/' + nft.media.fileUrl}
                        alt={nft.name}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                    ) : nft.media.filetype.includes('video') ? (
                      <video width="100%" controls>
                        <source
                          src={'http://localhost:3000/' + nft.media.fileUrl}
                          type={nft.media.filetype}
                        />
                      </video>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Unsupported Media Type
                      </Typography>
                    )}
                  </Box>

                  {/* NFT Info */}
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" color="text.primary" noWrap>
                      {nft.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {nft.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Pagination */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Container>
        </Box><br/><br/>

        {/* Floating Action Button (FAB) */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 10,
          }}
          onClick={() => navigate('/upload')}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Use Suspense to handle lazy loading of NFTDrawer */}
      <Suspense fallback={<div>Loading NFT details...</div>}>
        <NFTDrawer open={openDrawer} selectedNFT={selectedNFT} onClose={handleCloseDrawer} />
      </Suspense>
    </>
  );
};

export default Home;
