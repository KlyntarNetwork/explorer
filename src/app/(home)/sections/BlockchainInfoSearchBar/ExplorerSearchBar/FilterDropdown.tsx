import React, { FC } from 'react';
import { Box, BoxProps, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SEARCH_OPTIONS } from './constants';
import ArrowDownIcon from '@public/icons/ui/arrowDown.svg';

export const FilterDropdown: FC<{
  searchType: string;
  handleSearchTypeChange: (e: SelectChangeEvent) => void;
}> = ({
  searchType,
  handleSearchTypeChange
}) => {
  return (
    <FormControl variant="standard">
      <Select
        labelId="search-type-label"
        label="Type"
        value={searchType}
        onChange={handleSearchTypeChange}
        IconComponent={CustomSelectIcon}
        sx={{
          borderRight: '1px solid rgba(255,255,255,0.12)',
          '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input': {
            pl: 4,
            pr: 1.75,
            py: 0.55,
            fontSize: '0.82rem',
          }
        }}
      >
        <MenuItem value={SEARCH_OPTIONS.CHOOSE}>Auto</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.TRANSACTION_BY_HASH}>Tx ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.BLOCK_BY_SID}>SID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.BLOCK_BY_ID}>Block ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.POOL_BY_ID}>Pool ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.EPOCH_BY_ID}>Epoch ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.ACCOUNT_BY_ID}>Account ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.CONTRACT_BY_ID}>Contract ID</MenuItem>
      </Select>
    </FormControl>
  );
}

const CustomSelectIcon = (props: BoxProps) => (
  <Box {...props}>
    <ArrowDownIcon />
  </Box>
);