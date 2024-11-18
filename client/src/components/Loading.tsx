import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center'
      }}>
      <CircularProgress />
    </Box>
  );
}
