'use client';
import React, { FC } from 'react';
import { useQueryShard } from '@/hooks';
import { Autocomplete, AutocompleteValue, TextField } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import SearchIcon from '@public/icons/ui/search.svg';

interface ComboboxItemProps {
  label: string,
  value: string
}

export const ShardSearchBar: FC<{ shardsList: ComboboxItemProps[]}> = ({
  shardsList
}) => {
  const {
    shard,
    handleShardChange
  } = useQueryShard(shardsList);

  const isOptionEqualToValue = (option: ComboboxItemProps, value: ComboboxItemProps | null) => {
    return value ? option.value === value.value : false;
  };

  return (
    <FlexBetweenBox
      sx={{
        gap: 2,
        pl: { xs: 1.25, md: 1.5 },
        pr: 0.4,
        py: 0.25,
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        position: 'relative',
      }}
    >
      <Autocomplete
        disablePortal
        options={shardsList}
        value={shard}
        disableClearable={true}
        onChange={handleShardChange as AutocompleteValue<any, any, any, any>}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{
          flex: 1,
          '& .MuiInputBase-root': {
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.95rem',
          },
          '& .MuiInputBase-input': {
            py: 1.1,
          },
          '& .MuiAutocomplete-popupIndicator': {
            color: 'rgba(255,255,255,0.65)',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Select shard'
            inputProps={{
              ...params.inputProps,
              style: {
                fontSize: '14px',
              },
            }}
          />
        )}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}

