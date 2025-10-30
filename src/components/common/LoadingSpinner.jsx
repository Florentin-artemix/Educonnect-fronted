import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Chargement...', size = 40 }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
    gap={2}
  >
    <CircularProgress size={size} />
    <Typography variant="body1" color="textSecondary">
      {message}
    </Typography>
  </Box>
);

export default LoadingSpinner;
