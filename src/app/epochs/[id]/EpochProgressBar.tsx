'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function formatCountdown(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, '0')}s`;
  return `${s}s`;
}

export function EpochProgressBar({
  startTimestamp,
  epochDurationMs,
  isCurrent,
}: {
  startTimestamp: number;
  epochDurationMs: number;
  isCurrent: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isCurrent) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [isCurrent]);

  // Normalize to milliseconds defensively (some APIs return seconds)
  const startMs = startTimestamp < 1_000_000_000_000 ? startTimestamp * 1000 : startTimestamp;

  const { progress, endsAt, remainingMs, isComplete } = useMemo(() => {
    const end = startMs + epochDurationMs;
    const elapsed = now - startMs;
    const p = clamp01(elapsed / Math.max(1, epochDurationMs));
    const remaining = end - now;
    const complete = !isCurrent || remaining <= 0 || p >= 1;
    return {
      progress: isCurrent ? p : 1,
      endsAt: end,
      remainingMs: remaining,
      isComplete: complete,
    };
  }, [epochDurationMs, isCurrent, now, startMs]);

  const pct = Math.round(progress * 100);
  const status = isComplete ? 'Completed' : `Ends in ${formatCountdown(remainingMs)}`;

  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        p: { xs: 1.25, md: 1.5 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 12, md: 13 },
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 500,
          }}
        >
          Epoch progress
        </Typography>
        <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: 'rgba(255,255,255,0.7)' }}>
          {status} · {pct}%
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: 10,
          borderRadius: 999,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'left center',
            transform: `scaleX(${progress})`,
            background:
              'linear-gradient(90deg, rgba(122,238,229,0.95) 0%, rgba(63,241,230,0.95) 45%, rgba(255,49,49,0.75) 100%)',
            boxShadow: '0 0 18px rgba(122,238,229,0.18)',
            transition: 'transform 600ms ease',
            // New motion style: subtle diagonal "scanner" stripes + pulsing end-cap glow
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0 10px, rgba(255,255,255,0.00) 10px 20px)',
              opacity: 0.12,
              mixBlendMode: 'overlay',
              backgroundSize: '40px 40px',
              animation: isComplete ? 'none' : 'epochStripes 1.6s linear infinite',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -8,
              bottom: -8,
              right: -10,
              width: 36,
              background:
                'radial-gradient(closest-side, rgba(122,238,229,0.40), rgba(122,238,229,0.00) 70%)',
              filter: 'blur(0px)',
              opacity: isComplete ? 0 : 0.9,
              animation: isComplete ? 'none' : 'epochPulse 1.4s ease-in-out infinite',
              pointerEvents: 'none',
            },
            '@keyframes epochStripes': {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '40px 40px' },
            },
            '@keyframes epochPulse': {
              '0%': { opacity: 0.55 },
              '50%': { opacity: 0.95 },
              '100%': { opacity: 0.55 },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          Start: {new Date(startMs).toUTCString().replace('GMT', 'UTC')}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          End: {new Date(endsAt).toUTCString().replace('GMT', 'UTC')}
        </Typography>
      </Box>
    </Box>
  );
}


