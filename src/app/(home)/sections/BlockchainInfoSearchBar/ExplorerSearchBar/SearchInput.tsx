import React, { ChangeEvent, FC, KeyboardEvent } from 'react';
import { TextField } from '@mui/material';

export const SearchInput: FC<{
  placeholder: string
  isChoose: boolean,
  query: string,
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}> = ({
  placeholder,
  isChoose,
  query,
  handleQueryChange,
  handleKeyDown,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={query}
      onChange={handleQueryChange}
      onKeyDown={handleKeyDown}
      size="small"
      spellCheck={false}
      autoComplete="off"
      sx={{
        flex: 1,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' },
          '&:hover fieldset': { borderColor: 'transparent' },
          '&.Mui-focused fieldset': { borderColor: 'transparent' },
        },
        '& .MuiOutlinedInput-input': {
          py: 0.6,
        },
      }}
      inputProps={{
        maxLength: 200,
        style: { fontSize: '13.5px' },
        // Always allow typing. If filter is not chosen, we auto-detect type on submit.
      }}
    />
  );
}
