'use client';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

type TrendingItem = {
  symbol: string;
  iconSrc: string;
};

const TRENDING: TrendingItem[] = [
  { symbol: 'BTC', iconSrc: '/icons/currencies/BTC.svg' },
  { symbol: 'ETH', iconSrc: '/icons/currencies/ETH.svg' },
  { symbol: 'USDC', iconSrc: '/icons/currencies/USDC.svg' },
  { symbol: 'BNB', iconSrc: '/icons/currencies/BNB.svg' },
  { symbol: 'TON', iconSrc: '/icons/currencies/TON.svg' },
  { symbol: 'AVAX', iconSrc: '/icons/currencies/AVAX.svg' },
  { symbol: 'SOL', iconSrc: '/icons/currencies/SOL.svg' },
];

export const TrendingTicker = () => {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 1.25, md: 1.5 },
        py: 0.75,
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, md: 1.25 },
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 12, md: 13 },
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.72)',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          flex: '0 0 auto',
        }}
      >
        Trending:
      </Typography>

      <Box
        sx={{
          minWidth: 0,
          flex: '1 1 auto',
          // subtle edge fade (like Sui)
          WebkitMaskImage:
            'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, rgba(0,0,0,0))',
          maskImage:
            'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, rgba(0,0,0,0))',
        }}
      >
        <Marquee speed={35} gradient={false} pauseOnHover>
          {TRENDING.map((t, idx) => (
            <Box
              key={`${t.symbol}-${idx}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                mx: { xs: 1.25, md: 1.5 },
              }}
            >
              <Box
                component="img"
                src={t.iconSrc}
                alt={t.symbol}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
                  flex: '0 0 auto',
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: 13, md: 14 },
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255,255,255,0.82)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.symbol}
              </Typography>
            </Box>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};


