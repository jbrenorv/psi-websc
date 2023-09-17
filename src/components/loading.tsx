import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <>
      <h1>Loading...</h1>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </>
  );
}
