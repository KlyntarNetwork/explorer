'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import { getShardNodeUrl } from '@/config/shards';
import { ShardSelector } from './ShardSelector';

const CUSTOM_RPC_COOKIE_PREFIX = 'klyntar_custom_rpc_';
const CUSTOM_RPC_STORAGE_PREFIX = 'klyntar:customRpc:';

function safeNormalizeRpc(input: string) {
  const raw = input.trim();
  if (!raw) return '';
  const u = new URL(raw);
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error('Only http/https URLs are supported');
  }
  return u.toString().replace(/\/+$/, '');
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export const SiteSettingsModal: FC<{
  open: boolean;
  onClose: () => void;
  shardsList: string[];
}> = ({ open, onClose, shardsList }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentShard = searchParams.get('shard')?.toString() || shardsList[0] || '0';

  const storageKey = useMemo(() => `${CUSTOM_RPC_STORAGE_PREFIX}${currentShard}`, [currentShard]);
  const cookieKey = useMemo(() => `${CUSTOM_RPC_COOKIE_PREFIX}${currentShard}`, [currentShard]);

  const defaultEndpoint = useMemo(() => {
    try {
      return getShardNodeUrl(currentShard);
    } catch {
      return '';
    }
  }, [currentShard]);

  const [useDefaultEndpoint, setUseDefaultEndpoint] = useState(true);
  const [customRpc, setCustomRpc] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    try {
      const stored = window.localStorage.getItem(storageKey) || '';
      setCustomRpc(stored);
      setUseDefaultEndpoint(!stored);
    } catch {
      setCustomRpc('');
      setUseDefaultEndpoint(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, storageKey]);

  const applyDefault = () => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    clearCookie(cookieKey);
    setCustomRpc('');
    setUseDefaultEndpoint(true);
    setError(null);
    router.refresh();
  };

  const applyCustom = () => {
    try {
      const normalized = safeNormalizeRpc(customRpc);
      if (!normalized) {
        applyDefault();
        return;
      }
      try {
        window.localStorage.setItem(storageKey, normalized);
      } catch {
        // ignore
      }
      setCookie(cookieKey, normalized);
      setCustomRpc(normalized);
      setUseDefaultEndpoint(false);
      setError(null);
      router.refresh();
    } catch (e: any) {
      setError(e?.message || 'Invalid RPC URL');
    }
  };

  const paperSx = {
    borderRadius: { xs: '14px', md: '18px' },
    border: '1px solid rgba(255,255,255,0.08)',
    backgroundColor: '#000',
    // Keep it truly black; avoid "grey haze" from heavy translucent blur.
    backdropFilter: 'blur(6px)',
    boxShadow: '0 44px 180px rgba(0,0,0,0.92), inset 0 1px 0 rgba(255,255,255,0.05)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background:
        // Tight corner glows only (avoid global wash that looks grey)
        'radial-gradient(520px 280px at 12% 6%, rgba(122,238,229,0.10) 0%, transparent 62%), radial-gradient(520px 280px at 92% 8%, rgba(122,238,229,0.06) 0%, transparent 66%)',
      pointerEvents: 'none',
      opacity: 0.35,
    },
    '& > *': { position: 'relative' },
  } as const;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(8px)',
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          // Hard center (MUI flex centering can look low depending on viewport/scroll state)
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          width: 'min(640px, calc(100vw - 24px))',
          maxHeight: 'calc(100vh - 24px)',
        },
        '& .MuiDialog-container': {
          // Ensure the portal container doesn't introduce extra offsets
          alignItems: 'stretch',
          justifyContent: 'stretch',
        },
      }}
      PaperProps={{ sx: paperSx }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 1.6, md: 2 },
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: 0 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 999,
              border: '1px solid rgba(122,238,229,0.22)',
              backgroundColor: 'rgba(0,0,0,0.55)',
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto',
            }}
          >
            <SettingsOutlinedIcon sx={{ color: 'rgba(122,238,229,0.92)' }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.2,
              }}
            >
              Site settings
            </Typography>
            <Typography sx={{ mt: 0.35, color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
              Customize shard and node endpoint
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.75)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 2.5 },
          backgroundColor: '#000',
        }}
      >
        <Box
          sx={{
            p: { xs: 1.75, md: 2 },
            borderRadius: { xs: '12px', md: '14px' },
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(14px)',
            boxShadow:
              '0 12px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <Typography sx={{ fontWeight: 650, color: 'rgba(255,255,255,0.9)', mb: 1 }}>
            Shard
          </Typography>
          <ShardSelector shards={shardsList} fullWidth />
          <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.52)', fontSize: '0.85rem' }}>
            Current shard affects blocks, entities and API routing
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            p: { xs: 1.75, md: 2 },
            borderRadius: { xs: '12px', md: '14px' },
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(14px)',
            boxShadow:
              '0 12px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 650, color: 'rgba(255,255,255,0.9)' }}>
                RPC endpoint
              </Typography>
              <Typography sx={{ mt: 0.35, color: 'rgba(255,255,255,0.52)', fontSize: '0.85rem' }}>
                Default: {defaultEndpoint || '—'}
              </Typography>
            </Box>
            <Switch
              checked={useDefaultEndpoint}
              onChange={(e) => {
                const next = e.target.checked;
                setUseDefaultEndpoint(next);
                setError(null);
                if (next) {
                  applyDefault();
                }
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'rgba(122,238,229,0.65)',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 1.5 }}>
            <TextField
              value={customRpc}
              onChange={(e) => {
                setCustomRpc(e.target.value);
                setError(null);
              }}
              disabled={useDefaultEndpoint}
              size="small"
              placeholder="Enter RPC URL…"
              error={!!error}
              helperText={error || ' '}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: '12px',
                  backgroundColor: useDefaultEndpoint ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.45)',
                  color: 'rgba(255,255,255,0.92)',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.08)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.14)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(122,238,229,0.45)',
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1.25, mt: 1 }}>
            <Button
              onClick={applyCustom}
              disabled={useDefaultEndpoint}
              sx={{
                flex: 1,
                height: 40,
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.14)',
                backgroundColor: useDefaultEndpoint ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.92)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.16)' },
              }}
            >
              Connect
            </Button>
            <Button
              onClick={applyDefault}
              sx={{
                height: 40,
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.72)',
                textTransform: 'none',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};


