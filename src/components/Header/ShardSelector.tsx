'use client';

import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const STORAGE_KEY = 'klyntar:selectedShard';

export const ShardSelector: FC<{ shards: string[]; fullWidth?: boolean }> = ({ shards, fullWidth = false }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentShard = searchParams.get('shard')?.toString() || '';

  const options = useMemo(() => shards, [shards]);
  const [value, setValue] = useState<string>(options[0] ?? '0');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorWidth, setAnchorWidth] = useState<number>(0);
  const isOpen = Boolean(anchorEl);

  const setQueryShard = (nextShard: string, shouldResetPage: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set('shard', nextShard);
    if (shouldResetPage) {
      // Reset pagination without polluting URL with page=1
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Sync from URL / localStorage on mount & navigation
  useEffect(() => {
    const first = options[0] ?? '0';
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;

    const desired =
      (currentShard && shards.includes(currentShard) && currentShard) ||
      (stored && shards.includes(stored) && stored) ||
      first;

    setValue(desired);

    // Ensure URL always has shard (global selection)
    if (desired && desired !== currentShard) {
      setQueryShard(desired, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShard, shards.join('|')]);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setAnchorWidth(Math.round(event.currentTarget.getBoundingClientRect().width));
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: fullWidth ? '100%' : 'auto' }}>
      <Button
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        endIcon={<ArrowDropDownRoundedIcon sx={{ color: 'inherit' }} />}
        startIcon={<LayersOutlinedIcon sx={{ color: 'inherit' }} />}
        sx={{
          height: { xs: 38, md: 44 },
          minWidth: fullWidth ? undefined : { xs: 124, md: 138 },
          width: fullWidth ? '100%' : undefined,
          px: { xs: 1.1, md: 1.35 },
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundColor: isOpen ? 'rgba(17, 17, 17, 0.52)' : 'rgba(17, 17, 17, 0.30)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 16px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'background-color 160ms ease, border-color 160ms ease, transform 160ms ease',
          color: 'rgba(255,255,255,0.92)',
          justifyContent: fullWidth ? 'space-between' : 'center',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(255,255,255,0.92)',
            color: '#000',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
          '&:focus-visible': {
            outline: '2px solid rgba(122,238,229,0.35)',
            outlineOffset: 2,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '0.78rem', md: '0.82rem' },
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            color: 'inherit',
            fontWeight: 500,
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Shard {value}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{ sx: { p: 0 } }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: fullWidth ? Math.max(anchorWidth, 220) : 220,
            width: fullWidth ? Math.max(anchorWidth, 220) : undefined,
            maxWidth: 'calc(100vw - 24px)',
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
          },
        }}
      >
        {options.map((shardId, idx) => {
          const isActive = shardId === value;
          return (
            <MenuItem
              key={shardId}
              onClick={() => {
                handleClose();
                setValue(shardId);
                try {
                  window.localStorage.setItem(STORAGE_KEY, shardId);
                } catch {
                  // ignore
                }
                setQueryShard(shardId, true);
              }}
              sx={{
                px: 1.5,
                py: 1.1,
                borderBottom: idx === options.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, width: '100%' }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '999px',
                    backgroundColor: isActive ? 'rgba(122,238,229,0.95)' : 'rgba(255,255,255,0.18)',
                    boxShadow: isActive ? '0 0 0 3px rgba(122,238,229,0.14)' : 'none',
                    flex: '0 0 auto',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: isActive ? 'rgba(122,238,229,0.95)' : 'rgba(255,255,255,0.88)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Shard {shardId}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};



