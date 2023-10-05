import { ReactNode } from 'react';
import Box from '@mui/material/Box';

export default function Center({ children }: { children: ReactNode; }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      {children}
    </Box>
  );
}
