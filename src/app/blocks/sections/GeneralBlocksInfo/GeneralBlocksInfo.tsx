import { Grid, Box, Typography } from '@mui/material';
import { TransactionsChart } from './TransactionsChart';
import { fetchBlockchainData, fetchRecentTotalBlocksAndTxs } from '@/data';

export const GeneralBlocksInfo = async () => {
  const data = await fetchBlockchainData();
  const recentBlockStats = await fetchRecentTotalBlocksAndTxs(14);

  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        backgroundColor: 'rgba(17, 17, 17, 0.35)',
        backdropFilter: 'blur(12px)',
        boxShadow:
          '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        p: { xs: 1.5, md: 2.25 },
      }}
    >
      <Typography variant='h1' sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        General blocks overview
      </Typography>
      <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
        Recent activity and high-level network stats
      </Typography>

      <Box
        sx={{
          mt: { xs: 2.5, md: 3 },
          borderRadius: { xs: '0.75rem', md: '1rem' },
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(0,0,0,0.55)',
        }}
      >
        <Box sx={{ p: { xs: 1.25, md: 1.5 }, minHeight: { xs: 220, md: 260 } }}>
          <TransactionsChart recentBlockStats={recentBlockStats} />
        </Box>
      </Box>

      <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mt: { xs: 2.5, md: 3 } }}>
        <Grid item xs={12} md={4}>
          <StatCard title='Blocks (all-time)' value={data.totalBlocksNumber} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title='Blocks (current epoch)' value={data.totalBlocksNumberInCurrentEpoch} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title='Slot time' value={`${data.slotTimeInSeconds}s`} />
        </Grid>
      </Grid>
    </Box>
  );

}

const StatCard = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(10px)',
        p: { xs: 2, md: 2.25 },
        height: '100%',
        boxShadow:
          '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '0.625rem', md: '0.6875rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.16em', md: '0.18em' },
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#fff',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};