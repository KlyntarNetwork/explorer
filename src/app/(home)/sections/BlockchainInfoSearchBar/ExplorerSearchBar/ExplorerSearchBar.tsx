'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent, } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';
import { SEARCH_OPTIONS, SEARCH_OPTIONS_URL, SEARCH_OPTIONS_PLACEHOLDER } from './constants';
import SearchIcon from '@public/icons/ui/search.svg';

export const ExplorerSearchBar = () => {
  const { push } = useRouter();
  const [searchType, setSearchType] = useState(SEARCH_OPTIONS.CHOOSE);
  const [query, setQuery] = useState('');

  const isChoose = searchType === SEARCH_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isChoose || !query) {
      return false;
    }
    logUserAction(USER_ACTIONS.SEARCH_VIA_MAIN_BAR, { value: searchType })
    push(`${SEARCH_OPTIONS_URL[searchType]}/${query.trim()}`);
  };

  return (
    <FlexBetweenBox
      sx={{
        gap: 2,
        px: { xs: 0.5, md: 0.75 },
        py: { xs: 0.5, md: 0.75 },
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
      <FilterDropdown
        searchType={searchType}
        handleSearchTypeChange={handleSearchTypeChange}
      />
      <SearchInput
        placeholder={SEARCH_OPTIONS_PLACEHOLDER[searchType]}
        isChoose={isChoose}
        query={query}
        handleQueryChange={handleQueryChange}
        handleKeyDown={handleKeyDown}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        onClick={handleSubmit}
        sx={{ py: 0.75 }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}

