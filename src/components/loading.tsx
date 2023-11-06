import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Center from './flex/center';

export default function Loading() {
  return (
    <Center>
      <h1>Loading...</h1>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </Center>
  );
}
