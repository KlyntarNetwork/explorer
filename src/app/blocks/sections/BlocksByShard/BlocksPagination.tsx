'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, IconButton, InputBase, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function BlocksPagination({
  shard,
  rowsPerPage,
  latestHeight,
  from,
}: {
  shard: string;
  rowsPerPage: number;
  latestHeight: number;
  from: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = useMemo(() => {
    const totalBlocks = Math.max(1, latestHeight + 1);
    return Math.max(1, Math.ceil(totalBlocks / rowsPerPage));
  }, [latestHeight, rowsPerPage]);

  const currentPage = useMemo(() => {
    const delta = latestHeight - from;
    if (!Number.isFinite(delta) || delta <= 0) return 1;
    return clamp(Math.floor(delta / rowsPerPage) + 1, 1, totalPages);
  }, [from, latestHeight, rowsPerPage, totalPages]);

  const fromRange = useMemo(() => {
    const to = Math.max(0, from - rowsPerPage + 1);
    return { from, to };
  }, [from, rowsPerPage]);

  const [pageInput, setPageInput] = useState<string>(String(currentPage));

  const buildHrefForPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (shard) params.set('shard', shard);
    params.set('rows', String(rowsPerPage));
    params.delete('page'); // legacy

    const nextFrom = clamp(latestHeight - (page - 1) * rowsPerPage, 0, latestHeight);
    params.set('from', String(nextFrom));
    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.replace(buildHrefForPage(page), { scroll: false });
  };

  const onCommitInput = () => {
    const next = clamp(Number(pageInput || currentPage), 1, totalPages);
    setPageInput(String(next));
    goToPage(next);
  };

  const pageIsFirst = currentPage <= 1;
  const pageIsLast = currentPage >= totalPages;

  const controlHeight = 36;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.25, width: '100%' }}>
      <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
        Heights {fromRange.from} → {fromRange.to} (latest {latestHeight})
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button
          component={pageIsFirst ? 'button' : Link}
          {...(pageIsFirst ? {} : { href: buildHrefForPage(1), scroll: false })}
          disabled={pageIsFirst}
          size="small"
          variant="outlined"
          sx={{
            height: controlHeight,
            borderColor: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.78)',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            textTransform: 'none',
            px: 1.25,
            py: 0,
            borderRadius: '10px',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.18)',
              backgroundColor: 'rgba(0,0,0,0.62)',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            },
          }}
        >
          First
        </Button>

        <IconButton
          component={pageIsFirst ? 'button' : (Link as any)}
          {...(pageIsFirst ? {} : { href: buildHrefForPage(currentPage - 1), scroll: false })}
          disabled={pageIsFirst}
          size="small"
          sx={{
            height: controlHeight,
            width: controlHeight,
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.18)',
              backgroundColor: 'rgba(0,0,0,0.62)',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            },
          }}
          aria-label="Previous page"
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            height: controlHeight,
            px: 1.25,
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)' }}>Page</Typography>
          <InputBase
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => {
              // keep in sync even if user just tabs away
              const next = clamp(Number(pageInput || currentPage), 1, totalPages);
              setPageInput(String(next));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onCommitInput();
              if (e.key === 'Escape') setPageInput(String(currentPage));
            }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-label': 'Page number' }}
            sx={{
              width: 72,
              height: controlHeight - 8,
              px: 1,
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(255,255,255,0.10)',
              transition: 'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.16)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              },
              '&.Mui-focused': {
                borderColor: 'rgba(122,238,229,0.32)',
                boxShadow: '0 0 0 2px rgba(122,238,229,0.10)',
              },
              '& input': {
                textAlign: 'center',
                padding: 0,
                height: '100%',
                lineHeight: 1,
              },
            }}
          />
          <Typography sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
            of {totalPages}
          </Typography>
        </Box>

        <IconButton
          component={pageIsLast ? 'button' : (Link as any)}
          {...(pageIsLast ? {} : { href: buildHrefForPage(currentPage + 1), scroll: false })}
          disabled={pageIsLast}
          size="small"
          sx={{
            height: controlHeight,
            width: controlHeight,
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.18)',
              backgroundColor: 'rgba(0,0,0,0.62)',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            },
          }}
          aria-label="Next page"
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>

        <Button
          component={pageIsLast ? 'button' : Link}
          {...(pageIsLast ? {} : { href: buildHrefForPage(totalPages), scroll: false })}
          disabled={pageIsLast}
          size="small"
          variant="outlined"
          sx={{
            height: controlHeight,
            borderColor: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.78)',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            textTransform: 'none',
            px: 1.25,
            py: 0,
            borderRadius: '10px',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.18)',
              backgroundColor: 'rgba(0,0,0,0.62)',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.35)',
            },
          }}
        >
          Last
        </Button>
      </Box>
    </Box>
  );
}


