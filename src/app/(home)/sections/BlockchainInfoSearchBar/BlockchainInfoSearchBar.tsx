'use client';
import { FC } from 'react';
import { Box } from '@mui/material';
import { PageContainer } from '@/components/ui';
import { ExplorerSearchBar } from './ExplorerSearchBar';

export const BlockchainInfoSearchBar: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#000', pt: { xs: 8, md: 12 }, pb: { xs: 3, md: 4 } }}>
      <PageContainer>
        <ExplorerSearchBar />
      </PageContainer>
    </Box>
  );
}

