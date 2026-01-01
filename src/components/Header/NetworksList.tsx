'use client';
import { FC, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { FlexColumnBox, Indicator } from '@/components/ui';
import { Box, Button, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import { BG_COLORS, COLORS } from '@/styles';
import { KLY_LINKS } from '@/config';

const networks = [
  {
    url: KLY_LINKS.EXPLORER_MAINNET,
    base: 'mainnet',
    label: 'Klyntar Mainnet',
  },
  {
    url: KLY_LINKS.EXPLORER_TESTNET,
    base: 'testnet',
    label: 'Klyntar Testnet',
  },
  {
    url: KLY_LINKS.EXPLORER_DEVNET,
    base: 'devnet',
    label: 'Klyntar Devnet',
  },
];

const isCurrentNetwork = (network: string) => {
  if (typeof window !== 'undefined') {
    const isTestnet = window.location.hostname.includes('testnet');
    const isDevnet = window.location.hostname.includes('devnet');
    return (
      (network === 'testnet' && isTestnet) || (network === 'devnet' && isDevnet) || network === 'mainnet' && (!isDevnet && !isTestnet)
    );
  }

  return false;
};

export const DesktopNetworksList: FC<{ sx?: SxProps }> = ({ sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    const resizeHandler = () => setAnchorEl(null);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      <Button
        id='networks-button'
        aria-controls={isOpen ? 'networks-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleOpen}
        sx={{
          height: { xs: 38, md: 44 },
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundColor: isOpen ? 'rgba(17, 17, 17, 0.5)' : 'rgba(17, 17, 17, 0.3)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.92)',
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          fontSize: { xs: '0.78rem', md: '0.82rem' },
          fontWeight: 500,
          px: { xs: 1.6, md: 1.8 },
          borderRadius: '999px',
          boxShadow: '0 16px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'background-color 160ms ease, border-color 160ms ease, transform 160ms ease',
          ':hover': { 
            background: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(255,255,255,0.92)',
            color: '#000',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0px)' },
        }}
      >
        <Indicator />
        Switch network
      </Button>

      <Menu
        id='networks-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'networks-button',
          sx: { p: 0 },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            backgroundColor: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 22px 70px rgba(0,0,0,0.65), 0 2px 14px rgba(0,0,0,0.35)',
            // Override global theme Menu styles (theme.ts overrides MuiMenu + MuiMenuItem heavily)
            '--Paper-shadow': 'none',
            '--Paper-overlay': 'none',
            '& .MuiButtonBase-root': {
              border: 'none !important',
            },
            '& .MuiMenuItem-root': {
              background: 'transparent !important',
            },
          }
        }}
      >
        {networks.map(({ base, label, url }) => (
          <MenuItem
            key={base}
            component='a'
            href={url}
            onClick={handleClose}
            sx={{
              borderRadius: '0px !important',
              px: { xs: 1.5, md: 2 },
              py: { xs: 0.875, md: 1 },
              backgroundColor: 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              cursor: isCurrentNetwork(base) ? 'default' : 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(17, 17, 17, 0.3)',
              },
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <Indicator
              color={isCurrentNetwork(base) ? COLORS.GREEN : 'transparent'}
            />
            <Typography
              color={isCurrentNetwork(base) ? '#7aeee5' : 'rgba(255,255,255,0.7)'}
              variant='caption'
              sx={{ 
                fontWeight: 400, 
                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                letterSpacing: '0.02em',
              }}
              onClick={() => logUserAction(USER_ACTIONS.SWITCH_NETWORK, { location: LOCATION.HEADER, value: base })}
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export const MobileNetworksList = () => {
  return (
    <FlexColumnBox sx={{ width: '100%', gap: 0 }}>
      <FlexColumnBox sx={{ width: '100%', gap: 0 }}>
        {networks.map(({ label, base, url }) => (
          <Typography
            key={url}
            color={isCurrentNetwork(base) ? 'primary' : 'text.primary'}
            variant='caption'
            sx={{
              fontWeight: 'bold',
              fontSize: '14px',
              lineHeight: 2.5,
              ml: 2
            }}
            onClick={() => logUserAction(USER_ACTIONS.SWITCH_NETWORK, { location: LOCATION.MOBILE_MENU, value: base })}
          >
            <Link
              href={url}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                textDecorationThickness: 'inherit',
                cursor: isCurrentNetwork(base) ? 'default' : 'pointer',
              }}
            >
              {label}
            </Link>
          </Typography>
        ))}
      </FlexColumnBox>
    </FlexColumnBox>
  );
};
