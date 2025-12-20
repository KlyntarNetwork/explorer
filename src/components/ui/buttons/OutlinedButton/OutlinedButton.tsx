'use client';
import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

interface OutlinedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  text?: string;
  url?: string;
  sx?: ButtonProps['sx'];
}

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.border.main,
  color: theme.palette.text.primary,
  borderWidth: '1px',
  borderRadius: 0,
  padding: 0,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const OutlinedButton: FC<OutlinedButtonProps> = ({
  icon,
  text,
  url = '',
  onClick,
  sx,
  ...rest
}) => {
  const isLink = !!url;

  const props = {
    sx: {
      width: {
        xs: '38px',
        md: '44px',
      },
      height: {
        xs: '38px',
        md: '44px',
      },
      minWidth: {
        xs: '38px',
        md: '44px',
      },
      ...sx,
    },
    variant: 'outlined',
    ...rest,
    ...(isLink
      ? {
          component: Link,
          href: url,
        }
      : {
          component: 'button',
          onClick,
        }
    ),
  };

  return (
    // @ts-ignore
    <StyledButton {...props}>
      {icon && icon}
      {text && text}
    </StyledButton>
  );
};
