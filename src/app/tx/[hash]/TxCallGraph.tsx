'use client';

import { Box, Chip, Typography } from '@mui/material';

type Node = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: { label: string; color: 'default' | 'success' | 'warning' | 'error' };
  children?: Node[];
};

// Temporary demo graph while node-indexer is unavailable.
const DEMO_GRAPH: Node = {
  id: 'root',
  title: 'Transaction',
  subtitle: 'Entry point',
  badge: { label: 'OK', color: 'success' },
  children: [
    {
      id: 'native',
      title: 'Native program call',
      subtitle: 'Coins transfer',
      badge: { label: 'TX', color: 'default' },
    },
    {
      id: 'contract',
      title: 'Contract call',
      subtitle: 'EVM/WASM execution',
      badge: { label: 'CALL', color: 'warning' },
      children: [
        {
          id: 'subcall1',
          title: 'Internal call',
          subtitle: 'func()',
          badge: { label: 'SUBCALL', color: 'default' },
        },
        {
          id: 'subcall2',
          title: 'Event emit',
          subtitle: 'log0/log1…',
          badge: { label: 'LOG', color: 'default' },
        },
      ],
    },
  ],
};

function NodeCard({ node }: { node: Node }) {
  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '14px',
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        px: 2,
        py: 1.5,
        minWidth: { xs: 220, md: 260 },
        maxWidth: 340,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>
            {node.title}
          </Typography>
          {node.subtitle ? (
            <Typography sx={{ mt: 0.25, fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>
              {node.subtitle}
            </Typography>
          ) : null}
        </Box>
        {node.badge ? (
          <Chip
            size="small"
            label={node.badge.label}
            color={node.badge.color}
            sx={{
              height: 22,
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
}

function Tree({ node }: { node: Node }) {
  const hasChildren = !!node.children?.length;
  return (
    <Box sx={{ display: 'grid', justifyItems: 'center' }}>
      <NodeCard node={node} />

      {hasChildren ? (
        <>
          {/* connector down */}
          <Box
            sx={{
              width: 2,
              height: 22,
              background: 'linear-gradient(180deg, rgba(122,238,229,0.55) 0%, rgba(255,255,255,0.10) 100%)',
              my: 1,
              borderRadius: 2,
              opacity: 0.9,
            }}
          />

          {/* children row */}
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: '1fr',
              gap: { xs: 1.5, md: 2 },
              alignItems: 'start',
              justifyContent: 'center',
              width: '100%',
              overflowX: 'auto',
              pb: 0.5,
              pt: 1.25,
              position: 'relative',
              // horizontal connector between children
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 16,
                right: 16,
                top: 0,
                height: 2,
                borderRadius: 2,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(122,238,229,0.35) 35%, rgba(255,255,255,0.10) 100%)',
                opacity: 0.75,
                pointerEvents: 'none',
              },
            }}
          >
            {node.children!.map((child) => (
              <Box key={child.id} sx={{ display: 'grid', justifyItems: 'center' }}>
                <Box
                  sx={{
                    width: 2,
                    height: 18,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)',
                    mb: 1,
                    borderRadius: 2,
                    opacity: 0.9,
                    // align with the horizontal connector line
                    mt: -1.25,
                  }}
                />
                <Tree node={child} />
              </Box>
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export function TxCallGraph() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ mb: 1.5, fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>
        Call graph (demo). Later this will be built from real execution traces.
      </Typography>
      <Box
        sx={{
          width: '100%',
          overflow: 'auto',
          pr: 0.5,
          pb: 0.5,
        }}
      >
        <Box sx={{ minWidth: 860, py: 0.5 }}>
          <Tree node={DEMO_GRAPH} />
        </Box>
      </Box>
    </Box>
  );
}


