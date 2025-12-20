'use client';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

// Моковые данные для графика (14 дней)
const generateChartData = () => {
  const baseValue = 94684390473;
  const data = [];
  const now = Date.now();
  for (let i = 0; i < 14; i++) {
    // Создаем небольшие колебания с небольшим трендом вверх
    const daysAgo = 13 - i;
    const variation = Math.sin(daysAgo * 0.5) * 0.0005 + (13 - daysAgo) * 0.0001;
    data.push(Math.floor(baseValue * (1 + variation)));
  }
  return data;
};

export const CoinInfoCard: FC = () => {
  // Моковые данные
  const coinPrice = '$0.2802';
  const priceChange24h = '+0.37%';
  const marketCap = '$26.55b';
  const volume24h = '$577.60m';
  const totalSupply = '94,684,390,973';
  const totalStaked = '45,807,498,008';
  const supplyChange = '+0.13%/y';
  
  const chartData = generateChartData();
  const chartCategories = Array.from({ length: 14 }, (_, i) => i + 1);
  
  const chartOptions = {
    chart: {
      type: 'area',
      height: 80,
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#7aeee5'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#7aeee5',
            opacity: 0.3,
          },
          {
            offset: 100,
            color: '#7aeee5',
            opacity: 0,
          },
        ],
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: chartCategories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: {
      theme: 'dark',
      style: {
        color: '#fff',
        fontSize: '12px',
      },
    },
    markers: {
      size: 0,
    },
  };
  
  const chartSeries = [{
    name: 'Total Supply',
    data: chartData,
  }];

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.5rem', md: '0.75rem' },
        p: { xs: '1rem', md: '1.25rem' },
        height: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
          opacity: 0.5,
          animation: 'colorPulse 10s ease-in-out infinite',
          '@keyframes colorPulse': {
            '0%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
            '10%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.028) 0%, transparent 50%)',
            },
            '20%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.025) 0%, transparent 50%)',
            },
            '30%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.02) 0%, transparent 50%)',
            },
            '40%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.015) 0%, transparent 50%)',
            },
            '50%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '60%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.028) 0%, transparent 50%)',
            },
            '70%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.025) 0%, transparent 50%)',
            },
            '80%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.02) 0%, transparent 50%)',
            },
            '90%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.015) 0%, transparent 50%)',
            },
            '100%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
        },
      }}
    >
      {/* Header with name, price and change */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 400,
              color: '#fff',
              mb: 0.25,
            }}
          >
            KLY
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 300,
              color: '#fff',
            }}
          >
            {coinPrice}
          </Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 0.75, md: 1 },
            py: { xs: 0.375, md: 0.5 },
            backgroundColor: 'rgba(122, 238, 229, 0.15)',
            border: '1px solid rgba(122, 238, 229, 0.3)',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.6875rem', md: '0.75rem' },
              fontWeight: 400,
              color: '#7aeee5',
            }}
          >
            {priceChange24h}
          </Typography>
          <Typography
            component='span'
            sx={{
              fontSize: { xs: '0.6875rem', md: '0.75rem' },
              color: '#7aeee5',
            }}
          >
            ↑
          </Typography>
        </Box>
      </Box>

      {/* Market Cap and Volume */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '0.625rem', md: '0.6875rem' },
              textTransform: 'uppercase',
              letterSpacing: { xs: '0.1em', md: '0.12em' },
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 400,
              mb: 0.25,
            }}
          >
            Market Cap
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              fontWeight: 400,
              color: '#fff',
            }}
          >
            {marketCap}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '0.625rem', md: '0.6875rem' },
              textTransform: 'uppercase',
              letterSpacing: { xs: '0.1em', md: '0.12em' },
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 400,
              mb: 0.25,
            }}
          >
            Volume (24h)
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              fontWeight: 400,
              color: '#fff',
            }}
          >
            {volume24h}
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          mb: 2,
        }}
      />

      {/* Chart and Supply Info */}
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '0.625rem', md: '0.6875rem' },
              textTransform: 'uppercase',
              letterSpacing: { xs: '0.1em', md: '0.12em' },
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 400,
              mb: 0.75,
            }}
          >
            Total Supply (14d)
          </Typography>
          <Box sx={{ height: '80px', width: '100%' }}>
            <ApexCharts
              options={{
                ...chartOptions,
                chart: {
                  ...chartOptions.chart,
                  height: 80,
                },
              }}
              series={chartSeries}
              type="area"
              height={80}
            />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '0.625rem', md: '0.6875rem' },
              color: '#7aeee5',
              fontWeight: 400,
              mt: 0.25,
            }}
          >
            {supplyChange}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: { md: '160px' } }}>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: '0.625rem', md: '0.6875rem' },
                textTransform: 'uppercase',
                letterSpacing: { xs: '0.1em', md: '0.12em' },
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 400,
                mb: 0.25,
              }}
            >
              Total Supply
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                fontWeight: 400,
                color: '#fff',
              }}
            >
              {totalSupply}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: '0.625rem', md: '0.6875rem' },
                textTransform: 'uppercase',
                letterSpacing: { xs: '0.1em', md: '0.12em' },
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 400,
                mb: 0.25,
              }}
            >
              Total Staked
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                fontWeight: 400,
                color: '#fff',
              }}
            >
              {totalStaked}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

