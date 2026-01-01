import { FC } from 'react';
import { Button } from '@mui/material';
import { SxProps, Typography } from '@mui/material';
import { KLY_LINKS } from '@/config';
import FaucetIcon from '@public/icons/pages/faucet.svg';
import Link from 'next/link';

export const FaucetButton: FC<{
  sx?: SxProps,
  variant?: 'icon' | 'text'
}> = ({ sx, variant = 'icon' }) => {
  const isIcon = variant === 'icon';

  if (isIcon) {
    return (
      <Button
        component="a"
        href={KLY_LINKS.TESTNET_FAUCET}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          p: 0,
          width: { xs: 38, md: 44 },
          height: { xs: 38, md: 44 },
          minWidth: { xs: 38, md: 44 },
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundColor: 'rgba(17,17,17,0.30)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 16px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'background-color 160ms ease, border-color 160ms ease, transform 160ms ease',
          display: 'grid',
          placeItems: 'center',
          lineHeight: 0,
          color: 'rgba(255,255,255,0.92)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(255,255,255,0.92)',
            color: '#000',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0px)' },
          '& svg': { width: 18, height: 'auto', maxHeight: 18, display: 'block', fill: 'currentColor' },
          ...sx,
        }}
      >
        <FaucetIcon />
      </Button>
    );
  }

  return (
    <Typography
      variant='caption'
      sx={{
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: 2.5,
        ...sx
      }}
    >
      <Link
        href={KLY_LINKS.TESTNET_FAUCET}
        style={{
          color: 'inherit',
          textDecoration: 'inherit',
          textDecorationThickness: 'inherit',
        }}
      >
        Testnet Faucet
      </Link>
    </Typography>
  )
}