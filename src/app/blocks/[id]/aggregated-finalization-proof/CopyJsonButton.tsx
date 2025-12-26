'use client';

import { useMemo, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export function CopyJsonButton({ data }: { data: unknown }) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op (clipboard can be blocked)
    }
  };

  return (
    <Tooltip title={copied ? 'Copied' : 'Copy JSON'} placement="top">
      <IconButton
        size="small"
        onClick={handleCopy}
        sx={{
          p: 0.75,
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '10px',
          backgroundColor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          transition: 'border-color 160ms ease, background-color 160ms ease',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.18)',
            backgroundColor: 'rgba(0,0,0,0.45)',
          },
        }}
        aria-label="Copy JSON"
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}


