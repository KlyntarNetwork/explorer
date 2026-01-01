'use client';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, ListItemText, Menu, MenuItem, SelectChangeEvent } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FlexBetweenBox } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';
import { SEARCH_OPTIONS, SEARCH_OPTIONS_URL, SEARCH_OPTIONS_PLACEHOLDER } from './constants';

type Candidate = {
  label: string;
  href: string;
  inferredType: string;
};

const inferCandidates = (raw: string, currentShard: string): Candidate[] => {
  const q = raw.trim();
  if (!q) return [];
  const shardQs = currentShard ? `?shard=${encodeURIComponent(currentShard)}` : '';

  // Pool ID: "<pubkey>(POOL)"
  if (/\(POOL\)\s*$/i.test(q)) {
    return [{ label: 'Open Pool', href: `/pools/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.POOL_BY_ID }];
  }

  // Block ID: "<epoch>:<creator>:<index>" (2 colons)
  const colons = (q.match(/:/g) || []).length;
  if (colons === 2) {
    return [{ label: 'Open Block', href: `/blocks/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.BLOCK_BY_ID }];
  }

  // SID: "<shard>:<index>" (both numeric)
  if (/^\d+:\d+$/.test(q)) {
    return [{ label: 'Open Block (SID)', href: `/blocks/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.BLOCK_BY_SID }];
  }

  // Numeric-only: with selected shard treat as "absolute height in shard" (SID),
  // but keep an escape hatch to open Epoch (ambiguity).
  if (/^\d+$/.test(q)) {
    if (currentShard) {
      return [
        { label: `Open Block height in shard ${currentShard}`, href: `/blocks/${currentShard}:${q}${shardQs}`, inferredType: SEARCH_OPTIONS.BLOCK_BY_SID },
        { label: 'Open Epoch', href: `/epochs/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.EPOCH_BY_ID },
      ];
    }
    return [{ label: 'Open Epoch', href: `/epochs/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.EPOCH_BY_ID }];
  }

  // Tx hash: 64 hex (with or without 0x prefix)
  if (/^(0x)?[0-9a-fA-F]{64}$/.test(q)) {
    return [{ label: 'Open Transaction', href: `/tx/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.TRANSACTION_BY_HASH }];
  }

  // shard:entity is ambiguous (account vs contract)
  if (/^\d+:.+/.test(q)) {
    return [
      { label: 'Open as Account', href: `/users/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.ACCOUNT_BY_ID },
      { label: 'Open as Contract', href: `/contracts/${q}${shardQs}`, inferredType: SEARCH_OPTIONS.CONTRACT_BY_ID },
    ];
  }

  return [];
};

export const ExplorerSearchBar = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState(SEARCH_OPTIONS.CHOOSE);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const isChoose = searchType === SEARCH_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (menuAnchor) {
      setMenuAnchor(null);
      setCandidates([]);
    }
  };

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
    setMenuAnchor(null);
    setCandidates([]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
    if (event.key === 'Escape') {
      setMenuAnchor(null);
      setCandidates([]);
    }
  };

  const handleSubmit = () => {
    const currentShard = searchParams.get('shard')?.toString() || '';
    let q = query.trim();
    if (!q) {
      return false;
    }

    // Explicit filter -> old behavior
    if (!isChoose) {
      logUserAction(USER_ACTIONS.SEARCH_VIA_MAIN_BAR, { value: searchType });
      // Convenience: if user selected "SID" filter and typed only height, auto-prefix current shard.
      if (searchType === SEARCH_OPTIONS.BLOCK_BY_SID && currentShard && !q.includes(':') && /^\d+$/.test(q)) {
        q = `${currentShard}:${q}`;
      }
      push(`${SEARCH_OPTIONS_URL[searchType]}/${q}`);
      return;
    }

    // Auto mode: infer type and route
    const inferred = inferCandidates(q, currentShard);
    if (!inferred.length) {
      return false;
    }

    if (inferred.length === 1) {
      logUserAction(USER_ACTIONS.SEARCH_VIA_MAIN_BAR, { value: inferred[0].inferredType });
      push(inferred[0].href);
      return;
    }

    // Ambiguous -> let user pick (Account vs Contract)
    setCandidates(inferred);
    setMenuAnchor(containerRef.current);
  };

  return (
    <>
      <FlexBetweenBox
        ref={containerRef}
        sx={{
          gap: { xs: 1.25, md: 1.5 },
          px: { xs: 0.5, md: 0.75 },
          py: { xs: 0.35, md: 0.5 },
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:focus-within': {
            borderColor: 'rgba(122, 238, 229, 0.3)',
            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            animation: 'searchGlowPulse 10s ease-in-out infinite',
            '@keyframes searchGlowPulse': {
              '0%': {
                borderColor: 'rgba(122, 238, 229, 0.3)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '10%': {
                borderColor: 'rgba(122, 238, 229, 0.28)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '20%': {
                borderColor: 'rgba(122, 238, 229, 0.25)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '30%': {
                borderColor: 'rgba(122, 238, 229, 0.2)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '40%': {
                borderColor: 'rgba(122, 238, 229, 0.15)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '50%': {
                borderColor: 'rgba(255, 49, 49, 0.3)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 49, 49, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '60%': {
                borderColor: 'rgba(255, 49, 49, 0.28)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 49, 49, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '70%': {
                borderColor: 'rgba(255, 49, 49, 0.25)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 49, 49, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '80%': {
                borderColor: 'rgba(255, 49, 49, 0.2)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 49, 49, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '90%': {
                borderColor: 'rgba(255, 49, 49, 0.15)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 49, 49, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
              '100%': {
                borderColor: 'rgba(122, 238, 229, 0.3)',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(122, 238, 229, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
            },
          },
        }}
      >
        <FilterDropdown searchType={searchType} handleSearchTypeChange={handleSearchTypeChange} />
        <SearchInput
          placeholder={SEARCH_OPTIONS_PLACEHOLDER[searchType]}
          isChoose={isChoose}
          query={query}
          handleQueryChange={handleQueryChange}
          handleKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleSubmit}
          disableRipple
          sx={{
            minWidth: 44,
            height: { xs: 36, md: 38 },
            px: 0,
            borderRadius: 2,
            backgroundColor: 'rgba(63, 241, 230, 1)',
            color: '#0B0B0B',
            display: 'grid',
            placeItems: 'center',
            lineHeight: 0,
            boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
            '&:hover': {
              backgroundColor: 'rgba(63, 241, 230, 0.92)',
            },
            '& .MuiSvgIcon-root': { fontSize: 22, display: 'block' },
          }}
        >
          <SearchRoundedIcon />
        </Button>
      </FlexBetweenBox>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
          setCandidates([]);
        }}
        disableScrollLock
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 260,
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
          },
        }}
      >
        {candidates.map((c) => (
          <MenuItem
            key={c.href}
            onClick={() => {
              setMenuAnchor(null);
              setCandidates([]);
              logUserAction(USER_ACTIONS.SEARCH_VIA_MAIN_BAR, { value: c.inferredType });
              push(c.href);
            }}
          >
            <ListItemText primary={c.label} secondary={c.href} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

