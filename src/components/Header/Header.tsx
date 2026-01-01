'use client';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { MobileNetworksList, DesktopNetworksList } from './NetworksList';
import { SocialButtons } from './SocialButtons';
import { ShardSelector } from './ShardSelector';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { OutlinedButton, PageContainer } from '@/components/ui';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import MenuIcon from '@public/icons/ui/menu.svg';
import Close from '@public/icons/ui/close.svg';

const MobileSocialButtons = () => <SocialButtons variant="mobile" />;

const mobileHeaderElements = [
  {
    id: 'networks',
    label: 'Explore networks',
    element: MobileNetworksList,
  },
  {
    id: 'socials_and_other',
    label: 'Social media & other',
    element: MobileSocialButtons,
  },
];

export const Header = ({ shardsList }: { shardsList: string[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openedElement, setOpenedElement] = useState<string | null>(null);

  useEffect(() => {
    const resizeHandler = () => setIsOpen(false);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <PageContainer
        sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 1.5, md: 2 } }}
      >
        <Box
          sx={{
            gap: { xs: 2, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
        <Link href='/'>
          <KlyntarFoundationLogo />
        </Link>
        {isOpen ? (
          <OutlinedButton
            icon={<Close />}
            onClick={() => setIsOpen(false)}
            sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              }, } }}
          />
        ) : (
          <OutlinedButton
            icon={<MenuIcon />}
            onClick={() => setIsOpen(true)}
            sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              }, } }}
          />
        )}
        <Box
          sx={{
            display: { '@media (max-width: 1045px)': { display: 'none' }, md: 'flex' },
            gap: { md: 1.5, lg: 2 },
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
          }}
        >
          <SocialButtons />
          {/* Global shard selector (affects /blocks, searchbar SID, etc.) */}
          <ShardSelector shards={shardsList} />
          <DesktopNetworksList />
        </Box>
      </Box>
      <Collapse
        in={isOpen}
        timeout='auto'
        unmountOnExit
        sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              },} }}
      >
        <Box sx={{ px: 2, pb: 1.5, pt: 1 }}>
          <ShardSelector shards={shardsList} fullWidth />
        </Box>
        <List
          sx={{ 
            width: '100%', 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#000',
          }}
          component='div'
        >
          {mobileHeaderElements.map(({ id, label, element: Element }) => (
            <Fragment key={id}>
              <ListItemButton
                onClick={() =>
                  setOpenedElement(openedElement === id ? null : id)
                }
                sx={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(17, 17, 17, 0.3)',
                  },
                }}
              >
                <ListItemText 
                  primary={label}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: '0.8125rem', md: '0.875rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 400,
                    }
                  }}
                />
                {openedElement === id ? <ExpandLess sx={{ color: 'rgba(255,255,255,0.7)' }} /> : <ExpandMore sx={{ color: 'rgba(255,255,255,0.7)' }} />}
              </ListItemButton>
              <Collapse
                in={openedElement === id}
                timeout='auto'
                unmountOnExit
              >
                <ListItem component='div'>
                  <Element />
                </ListItem>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Collapse>
      </PageContainer>
    </Box>
  );
};
