'use client';
import { FC, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaucetButton } from './FaucetButton';
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
    <Box sx={{ ...sx }}>
      <FaucetButton sx={{ mr: 1 }} />

      <Button
        id='networks-button'
        aria-controls={isOpen ? 'networks-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleOpen}
        sx={{
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: isOpen ? 'rgba(17, 17, 17, 0.5)' : 'rgba(17, 17, 17, 0.3)',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
          fontWeight: 400,
          py: { xs: 1, md: 1.25 },
          px: { xs: 1.25, md: 1.5 },
          borderRadius: 0,
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
          ':hover': { 
            background: 'rgba(17, 17, 17, 0.5)',
            borderColor: 'rgba(255,255,255,0.15)',
          },
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
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            backgroundColor: '#000',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 0,
            mt: 0.5,
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
      <FaucetButton sx={{ pl: 2 }} variant='text' />
    </FlexColumnBox>
  );
};
