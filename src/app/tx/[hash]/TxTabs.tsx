'use client';

import { useMemo, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { ParsedBytecodeDisplay } from './ParsedBytecodeDisplay';
import { TxCallGraph } from './TxCallGraph';

type TabKey = 'actions' | 'raw' | 'state' | 'events';

export function TxTabs({
  initialTab,
  rawDetails,
  evmBytecode,
}: {
  initialTab?: string;
  rawDetails: object;
  evmBytecode?: string;
}) {
  const initialIndex = useMemo(() => {
    const key = (initialTab || '').toLowerCase() as TabKey;
    switch (key) {
      case 'actions':
        return 0;
      case 'raw':
        return 1;
      case 'state':
        return 2;
      case 'events':
        return 3;
      default:
        return 0;
    }
  }, [initialTab]);

  const [tabIndex, setTabIndex] = useState(initialIndex);

  return (
    <>
      <Tabs
        sx={{
          mb: { xs: 2, md: 2.5 },
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          '& .MuiTab-root': {
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: { xs: '0.6875rem', md: '0.75rem' },
            minHeight: 44,
            py: 1.25,
          },
          '& .Mui-selected': {
            color: 'rgba(255,255,255,0.92)',
          },
          '& .MuiTabs-indicator': {
            height: '2px',
            background:
              'linear-gradient(90deg, rgba(122,238,229,0.9) 0%, rgba(255,49,49,0.65) 100%)',
          },
        }}
        value={tabIndex}
        onChange={(_, next) => setTabIndex(next)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Actions map" />
        <Tab label="Raw body" />
        <Tab label="State changes" />
        <Tab label="Events log" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Actions map
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255,255,255,0.6)' }}>
            Execution flow and subcalls as a call graph (demo for now).
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TxCallGraph />
          </Box>
        </>
      )}

      {tabIndex === 1 && (
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Raw body
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255,255,255,0.6)' }}>
            Receipt-like details and raw payload.
          </Typography>
          <PrettyJSON data={rawDetails as any} />
          {evmBytecode ? (
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                Input format
              </Typography>
              <ParsedBytecodeDisplay bytecode={evmBytecode} />
            </Box>
          ) : null}
        </>
      )}

      {tabIndex === 2 && (
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            State changes
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255,255,255,0.6)' }}>
            This will be available later.
          </Typography>
          <Typography textAlign="center" sx={{ mt: 3, color: 'rgba(255,255,255,0.65)' }}>
            This will be available later
          </Typography>
        </>
      )}

      {tabIndex === 3 && (
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Events log
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255,255,255,0.6)' }}>
            This will be available later.
          </Typography>
          <Typography textAlign="center" sx={{ mt: 3, color: 'rgba(255,255,255,0.65)' }}>
            This will be available later
          </Typography>
        </>
      )}
    </>
  );
}


