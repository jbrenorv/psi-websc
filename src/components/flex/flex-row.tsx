import { ReactNode } from 'react';
import Box from '@mui/material/Box';

export default function FlexRow({ children }: { children: ReactNode; }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%'
    }}>
      {children}
    </Box>
  );
}
