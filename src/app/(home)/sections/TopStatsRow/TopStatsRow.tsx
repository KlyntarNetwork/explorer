'use client';

import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { BlockchainData } from '@/definitions';
import { MetricsGrid } from '../MetricsGrid';
import { CoinInfoCard } from '../CoinInfoCard';

interface Props {
  data: BlockchainData;
}

export const TopStatsRow: FC<Props> = ({ data }) => {
  return (
    <Grid container spacing={{ xs: 3, lg: 6 }} sx={{ alignItems: 'stretch' }}>
      <Grid item xs={12} lg={6}>
        <Box
          sx={{
            // Важно: фиксируем высоту на lg+, чтобы не было "дотягивания" после гидратации
            // Чуть ниже, чтобы карточки выглядели более "прямоугольными", но правая секция оставалась идеально вровень
            height: { xs: 'auto', lg: '20rem' },
          }}
        >
          <MetricsGrid data={data} />
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ height: { xs: 'auto', lg: '20rem' } }}>
          <CoinInfoCard />
        </Box>
      </Grid>
    </Grid>
  );
};


