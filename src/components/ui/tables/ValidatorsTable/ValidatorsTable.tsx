'use client';

import { Box, Typography } from '@mui/material';
import { BG_COLORS } from '@/styles';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

import React, { ChangeEvent, FC, ReactNode, useState } from 'react';

import { FlexBetweenBox, FlexCenterBox, GeometricButton, Label, LoadMoreButton } from '@/components/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import SearchIcon from '@public/icons/ui/search.svg';



interface InfoBlockProps {
  value: Array<{text: string; url: string; inQuorum: boolean;}>
  variant?: 'default' | 'glass';
  dense?: boolean;
}


export const VadlidatorsTable: FC<InfoBlockProps> = ({
  value,
  variant = 'default',
  dense,
}) => {
   const isGlass = variant === 'glass';
   const isDense = dense ?? isGlass;

   const [validators, setValidators] = useState(value.slice(0,25));
   const [query, setQuery] = useState('');

   const nextPage = Math.floor(validators.length / 25) + 1;
   const nextPageAvailable = validators.length < value.length;

 
   const filteredValue = query ? value.filter(validator => validator.text.includes(query)) : validators;
 
   const handleLoadMore = () => {
     if (nextPageAvailable) {
       setValidators(value.slice(0, 25 * nextPage));
     }
   }


   const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());
 

  const ValidatorTableCell = ({ children }: { children: ReactNode }) => (
    <TableCell sx={{ width: '20%' }}>
      {children}
    </TableCell>
  );

  const rowFontSize = isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px';
  const headerTypographySx = isGlass
    ? {
        fontSize: { xs: '0.6875rem', md: '0.75rem' },
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 500,
      }
    : undefined;

   return (
     <>
       <Box sx={{
         display: 'flex',
         justifyContent: 'flex-end',
         mt: isDense ? 2 : 3
       }}>
         <Box sx={{
           width: {
             lg: 'calc(50% - 24px)',
             xs: '100%'
           }
         }}>
           <ValidatorSearchBar handleSetQuery={handleSetQuery} variant={variant} dense={isDense} />
         </Box>
       </Box>
 
       <TableContainer
         sx={
           isGlass
             ? {
                 mt: { xs: 2, md: 2.5 },
                 border: '1px solid rgba(255,255,255,0.10)',
                 borderRadius: { xs: '0.75rem', md: '1rem' },
                 backgroundColor: 'rgba(0,0,0,0.55)',
                 backdropFilter: 'blur(12px)',
                 boxShadow:
                   '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
                 overflow: 'hidden',
               }
             : { mt: 2 }
         }
       >
         <Table
           sx={{
             minWidth: 650,
             ...(isGlass && {
               '& th, & td': {
                 borderBottom: '1px solid rgba(255,255,255,0.06)',
               },
             }),
           }}
           aria-label='Validators table'
         >
           <TableHead>
             <TableRow
               sx={
                 isGlass
                   ? {
                       background:
                         'linear-gradient(90deg, rgba(122,238,229,0.06) 0%, rgba(255,49,49,0.04) 100%)',
                     }
                   : undefined
               }
             >
               <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                 <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                   Validator ID
                 </Typography>
               </TableCell>
               <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                 <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                   Alias
                 </Typography>
               </TableCell>
               <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                 <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                   In quorum
                 </Typography>
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody
             sx={
               isGlass
                 ? {
                     '& .MuiTableRow-root': {
                       transition: 'background-color 160ms ease',
                     },
                     '& .MuiTableRow-root:hover': {
                       backgroundColor: 'rgba(255,255,255,0.03)',
                     },
                     '& .MuiTableCell-root': {
                       py: 1.35,
                     },
                   }
                 : undefined
             }
           >
             {filteredValue.map((validatorData) => (
               <TableRow key={validatorData.text}>
                 <ValidatorTableCell>
                   <Link
                     href={`${validatorData.url}`}
                     passHref
                     style={{ textDecoration: 'none' }}
                   >
                     <Typography color='primary.main' sx={{ fontSize: rowFontSize }}>
                       <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                       {validatorData.text}
                     </Typography>
                   </Link>
                 </ValidatorTableCell>
                 <ValidatorTableCell>
                  <Typography sx={{ fontSize: rowFontSize }}>
                    N/A
                  </Typography>
                </ValidatorTableCell>
                 <ValidatorTableCell>
                  <Typography sx={{ fontSize: rowFontSize }}>
                    <Label variant={validatorData.inQuorum ? "green" : "red"}>{validatorData.inQuorum ? 'Yes' : 'No'}</Label>
                  </Typography>
                </ValidatorTableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
 
       <FlexCenterBox sx={{ my: 3 }}>
         {nextPageAvailable && !query && (
           <LoadMoreButton onClick={handleLoadMore}/>
         )}
       </FlexCenterBox>
     </>
   );
 }
 


const ValidatorSearchBar = ({
  handleSetQuery,
  variant,
  dense,
}: {
  handleSetQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  variant: 'default' | 'glass';
  dense: boolean;
}) => {
  const isGlass = variant === 'glass';
  return (
    <FlexBetweenBox
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        py: 0.25,
        ...(isGlass
          ? {
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
            }
          : {
              border: 1,
              borderColor: 'border.main',
              background: BG_COLORS.GRAY_LIGHT
            }),
      }}
    >
      <TextField
        onChange={handleSetQuery}
        sx={{ width: '100%' }}
        autoComplete='off'
        spellCheck={false}
        inputProps={{ maxLength: 200 }}
        placeholder='Enter the validator pubkey'
        InputProps={{
          sx: {
            '& input': { fontSize: dense ? '14px' : undefined },
          },
        }}
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