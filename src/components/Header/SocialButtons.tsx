import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import DrawIcon from "@mui/icons-material/Draw";
import { socialIconsWithLinks } from "@/config";
import { OutlinedButton } from "@/components/ui";
import React, { useState } from "react";
import { Link, Search, Code } from "@mui/icons-material";

interface DropdownData {
  Tools: { name: string; icon: React.ComponentType }[];
  Explore: { name: string; icon: React.ComponentType }[];
  Services: { name: string; icon: React.ComponentType }[];
}

export const SocialButtons = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownData: DropdownData = {
    Tools: [
      { name: "Unit converter", icon: ChangeCircleIcon },
      { name: "Account checker", icon: Search },
      { name: "Data decoder", icon: Code },
    ],
    Explore: [
      { name: "Tokens", icon: AssuredWorkloadIcon },
      { name: "Appchains", icon: Link },
      { name: "Social value portal", icon: AutoAwesomeIcon },
    ],
    Services: [
      { name: "Token approvals", icon: VerifiedUserIcon },
      { name: "Verify signature", icon: DrawIcon },
      { name: "Approve contract", icon: SpellcheckIcon },
    ],
  };

  const dropdownKeys = Object.keys(dropdownData) as (keyof DropdownData)[];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mr: 1,
      }}
    >
      <OutlinedButton
        key={"more_button"}
        text="More"
        sx={{
          width: { xs: "70px", md: "84px" },
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            width: "100%",
            backgroundColor: "#000",
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 0,
            mt: 0.5,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 3 },
            p: { xs: 2, md: 2.5 },
            minWidth: { xs: '280px', sm: '400px', md: '600px' },
          }}
        >
          {dropdownKeys.map((columnTitle) => (
            <Box key={columnTitle}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.25em', md: '0.35em' },
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 400,
                  mb: { xs: 1, md: 1.25 },
                }}
              >
                {columnTitle}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                {dropdownData[columnTitle].map(({ name, icon: Icon }) => (
                  <MenuItem
                    key={name}
                    onClick={handleClose}
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      display: "flex",
                      alignItems: "center",
                      px: { xs: 0.875, md: 1 },
                      py: { xs: 0.625, md: 0.75 },
                      borderRadius: 0,
                      border: '1px solid transparent',
                      transition: 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(17, 17, 17, 0.4)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, md: 1 } }}>
                      <Icon sx={{ fontSize: { xs: '0.9375rem', md: '1rem' }, opacity: 0.7 }} />
                      <Typography 
                        sx={{ 
                          fontSize: { xs: '0.8125rem', md: '0.875rem' },
                          letterSpacing: '0.02em',
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Menu>
      {socialIconsWithLinks.map(({ icon: Icon, url }) => (
        <OutlinedButton key={url} icon={<Icon />} url={url} />
      ))}
    </Box>
  );
};
