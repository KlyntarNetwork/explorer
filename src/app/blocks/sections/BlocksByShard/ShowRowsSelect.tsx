'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, MenuItem, Select, Typography } from '@mui/material';

const ROW_OPTIONS = [10, 25, 50, 100] as const;

export function ShowRowsSelect({ value }: { value: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const normalizedValue = useMemo(() => {
    if (ROW_OPTIONS.includes(value as any)) return value;
    return 10;
  }, [value]);

  const handleChange = (next: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('rows', String(next));
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Typography
        sx={{
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
          color: 'rgba(255,255,255,0.65)',
          fontWeight: 400,
        }}
      >
        Show rows:
      </Typography>
      <Select
        value={String(normalizedValue)}
        onChange={(e) => handleChange(Number(e.target.value))}
        variant="standard"
        disableUnderline
        sx={{
          minWidth: 92,
          px: 1.25,
          py: 0.75,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: { xs: '0.75rem', md: '1rem' },
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255,255,255,0.85)',
          fontSize: { xs: '0.8125rem', md: '0.875rem' },
          '& .MuiSelect-select': {
            pr: 3.5,
          },
          '& .MuiSelect-icon': {
            color: 'rgba(255,255,255,0.65)',
            left: 'unset !important',
            right: '12px !important',
            top: '50% !important',
            transform: 'translateY(-50%) !important',
          },
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.18)',
            backgroundColor: 'rgba(0,0,0,0.62)',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              backgroundColor: 'rgba(0,0,0,0.78)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '12px',
              overflow: 'hidden',
              '--Paper-shadow':
                '0px 18px 60px rgba(0,0,0,0.60), 0px 2px 12px rgba(0,0,0,0.35)',
              '--Paper-overlay': 'none',
              boxShadow:
                '0px 18px 60px rgba(0,0,0,0.60), 0px 2px 12px rgba(0,0,0,0.35) !important',
              '& .MuiButtonBase-root': {
                border: 'none !important',
              },
              '& .MuiMenuItem-root': {
                background: 'transparent !important',
                borderRadius: '10px',
                margin: '4px 6px',
                paddingTop: '10px',
                paddingBottom: '10px',
                color: 'rgba(255,255,255,0.82)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.95)',
                },
              },
            },
          },
        }}
      >
        {ROW_OPTIONS.map((n) => (
          <MenuItem key={n} value={String(n)}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}


