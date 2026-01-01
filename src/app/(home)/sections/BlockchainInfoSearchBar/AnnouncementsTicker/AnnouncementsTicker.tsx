'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, IconButton, Typography } from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { announcements as defaultAnnouncements, AnnouncementItem } from './announcements';

export const AnnouncementsTicker: FC<{
  items?: AnnouncementItem[];
  intervalMs?: number;
}> = ({ items = defaultAnnouncements, intervalMs = 6500 }) => {
  const normalized = useMemo(() => items.filter(Boolean), [items]);
  const [hidden, setHidden] = useState(false);

  const [activeIdx, setActiveIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [rolling, setRolling] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    if (normalized.length <= 1) return;
    timerRef.current = window.setInterval(() => go('next'), intervalMs);
  };

  useEffect(() => {
    if (hidden) return;
    startTimer();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, normalized.length, intervalMs, activeIdx, rolling]);

  const go = (dir: 'next' | 'prev') => {
    if (normalized.length <= 1) return;
    if (rolling) return;

    const nextIdx =
      dir === 'next'
        ? (activeIdx + 1) % normalized.length
        : (activeIdx - 1 + normalized.length) % normalized.length;

    setDirection(dir);
    setIncomingIdx(nextIdx);
    setRolling(true);

    window.setTimeout(() => {
      setActiveIdx(nextIdx);
      setIncomingIdx(null);
      setRolling(false);
    }, 380);
  };

  const onClose = () => {
    setHidden(true);
    stopTimer();
  };

  if (hidden || normalized.length === 0) return null;

  const active = normalized[activeIdx];
  const incoming = incomingIdx === null ? null : normalized[incomingIdx];

  const content = (item: AnnouncementItem) => (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography
        sx={{
          fontSize: { xs: '0.78rem', md: '0.84rem' },
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );

  const wrap = (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '999px',
        backgroundColor: 'rgba(0,0,0,0.42)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 12px 34px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)',
        px: { xs: 0.75, md: 1 },
        py: 0.55,
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '999px',
          display: 'grid',
          placeItems: 'center',
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundColor: 'rgba(17,17,17,0.30)',
        }}
      >
        <CampaignOutlinedIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.78)' }} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, position: 'relative', height: 34 }}>
        {/* "Cube" roll animation: new comes from bottom, old goes to top (like flicking a cube away). */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            perspective: '900px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              transform: rolling ? (direction === 'next' ? 'rotateX(90deg)' : 'rotateX(-90deg)') : 'rotateX(0deg)',
              transition: rolling ? 'transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
            }}
          >
            {/* Front face (current) */}
            <Face href={active.href} transform="translateZ(17px)">
              {content(active)}
            </Face>

            {/* Bottom face (incoming for next) */}
            {incoming ? (
              <Face
                href={incoming.href}
                transform={direction === 'next' ? 'rotateX(-90deg) translateZ(17px)' : 'rotateX(90deg) translateZ(17px)'}
              >
                {content(incoming)}
              </Face>
            ) : null}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
        <IconButton
          onClick={() => go('prev')}
          disabled={normalized.length <= 1}
          sx={iconBtnSx}
          aria-label="Previous announcement"
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => go('next')}
          disabled={normalized.length <= 1}
          sx={iconBtnSx}
          aria-label="Next announcement"
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={onClose} sx={iconBtnSx} aria-label="Close announcements">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return wrap;
};

const Face: FC<{ href?: string; transform: string; children: any }> = ({ href, transform, children }) => {
  const isLink = !!href && href !== '#';
  return (
    <Box
      component={isLink ? Link : 'div'}
      href={isLink ? href : undefined}
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: { xs: 0.5, md: 0.75 },
        paddingRight: { xs: 0.5, md: 0.75 },
        textDecoration: 'none',
        cursor: isLink ? 'pointer' : 'default',
        transform,
        backfaceVisibility: 'hidden',
        // subtle "panel" shading helps the cube illusion
        filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.28))',
      }}
    >
      {children}
    </Box>
  );
};

const iconBtnSx = {
  width: 30,
  height: 30,
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.10)',
  backgroundColor: 'rgba(17,17,17,0.30)',
  color: 'rgba(255,255,255,0.78)',
  transition: 'background-color 160ms ease, border-color 160ms ease, transform 160ms ease, color 160ms ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: 'rgba(255,255,255,0.92)',
    color: '#000',
    transform: 'translateY(-1px)',
  },
  '&:active': { transform: 'translateY(0px)' },
  '&.Mui-disabled': {
    opacity: 0.35,
    cursor: 'default',
  },
} as const;


