import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Box, SxProps, Typography } from '@mui/material';
import { BG_COLORS } from '@/styles';
import LaunchIcon from '@mui/icons-material/Launch';

export const ContentBlock: FC<{
  children?: ReactNode,
  title?: string,
  url?: string;
  comment?: string,
  value?: string | number,
  variant?: 'red',
  blurred?: boolean,
  density?: 'default' | 'compact',
  sx?: SxProps
}> = ({
  children,
  title,
  url,
  comment,
  value,
  variant,
  blurred = false,
  density = 'default',
  sx
}) => {
  const isCompact = density === 'compact';
  const heroText = (
    <Typography
      sx={{
        fontSize: isCompact ? { xs: '0.95rem', md: '1.05rem' } : '24px',
        lineHeight: isCompact ? 1.25 : '30px',
        fontWeight: 300,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        display: 'inline'
      }}
      color={variant === 'red' ? 'secondary.main' : 'primary.main'}
    >
      {value}<br/>
      {comment && <Comment text={comment} />}
    </Typography>
  );

  return (
    <Box sx={{
      pt: isCompact ? 1.25 : 2,
      pb: isCompact ? 1.5 : 2.5,
      pl: isCompact ? 2 : 3,
      height: '100%',
      pr: isCompact ? 2 : 3,
      background: blurred ? 'rgba(17, 17, 17, 0.4)' : BG_COLORS.GRAY_LIGHT,
      ...(blurred && { backdropFilter: 'blur(5px)' }),
      ...sx
    }}>
      {title && (
        <Typography
          variant='caption'
          color='text.primary'
          sx={{
            display: 'block',
            mb: isCompact ? 0.75 : 1,
            letterSpacing: isCompact ? '0.16em' : undefined,
            opacity: isCompact ? 0.9 : undefined,
          }}
        >
          {title}
        </Typography>
      )}
      {children ? (
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
      ) : (
        <>
          {url ? (
            <LinkWrapper url={url}>{heroText}</LinkWrapper>
          ) : heroText}
        </>
      )}
    </Box>
  );
}

const LinkWrapper = ({
  children,
  url
}: {
  children: ReactNode,
  url: string
}) => {
  return (
    <Link
      href={url}
      passHref
      style={{
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', display: 'inline' }} />{' '}
      {children}
    </Link>
  );
}

const Comment: FC<{ text: string }> = ({ text }) => {
  return (
    <Typography
      color='text.secondary'
      sx={{
        fontSize: { xs: '0.95rem', md: '1.05rem' },
        lineHeight: 1.25,
        fontWeight: 300,
      }}
      component='span'
    >
      ({text})
    </Typography>
  );
}