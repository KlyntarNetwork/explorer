import { Box, Button, Divider, Grow, Menu, MenuItem, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import DrawIcon from "@mui/icons-material/Draw";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import React, { useState } from "react";
import { Code, Search } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import { KLY_LINKS } from "@/config";

type DropdownItem = {
  name: string;
  icon: React.ComponentType<SvgIconProps>;
  badge?: string;
  url?: string;
  external?: boolean;
};

interface DropdownData {
  Tools: DropdownItem[];
  Explore: DropdownItem[];
  Services: DropdownItem[];
}

const dropdownData: DropdownData = {
  Tools: [
    { name: "Unit converter", icon: ChangeCircleIcon },
    { name: "Account checker", icon: Search },
    { name: "Data decoder", icon: Code, badge: "Beta" },
    {
      name: "Testnet faucet",
      icon: LocalDrinkOutlinedIcon,
      url: KLY_LINKS.TESTNET_FAUCET,
      external: true,
    },
  ],
  Explore: [
    { name: "Tokens", icon: AssuredWorkloadIcon },
    { name: "Appchains", icon: LanguageIcon },
    { name: "Social value portal", icon: AutoAwesomeIcon },
  ],
  Services: [
    { name: "Token approvals", icon: VerifiedUserIcon, badge: "Beta" },
    { name: "Verify signature", icon: DrawIcon },
    { name: "Approve contract", icon: SpellcheckIcon, badge: "Beta" },
  ],
};

const dropdownKeys = Object.keys(dropdownData) as (keyof DropdownData)[];

const socialLinks: Array<{ label: string; url: string; icon: React.ComponentType<any> }> = [
  { label: "GitHub", url: KLY_LINKS.GITHUB, icon: GitHubIcon },
  { label: "X", url: KLY_LINKS.TWITTER, icon: XIcon },
  { label: "Telegram", url: KLY_LINKS.TELEGRAM, icon: TelegramIcon },
  { label: "Reddit", url: KLY_LINKS.REDDIT, icon: RedditIcon },
  { label: "Facebook", url: KLY_LINKS.FACEBOOK, icon: FacebookIcon },
];

export const SocialButtons = ({ variant = "header" }: { variant?: "header" | "mobile" }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: variant === "mobile" ? "wrap" : "nowrap",
        gap: 1,
        mr: variant === "mobile" ? 0 : 1,
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      <Button
        key={"more_button"}
        id="more-menu-button"
        aria-haspopup="true"
        aria-controls={open ? "more-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          height: { xs: 38, md: 44 },
          px: { xs: 1.4, md: 1.6 },
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.10)",
          backgroundColor: open ? "rgba(17,17,17,0.52)" : "rgba(17,17,17,0.30)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 16px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
          color: "rgba(255,255,255,0.92)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.92)",
            borderColor: "rgba(255,255,255,0.92)",
            color: "#000",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0px)" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.78rem", md: "0.82rem" },
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "inherit",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          More
        </Typography>
      </Button>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "more-menu-button",
          sx: {
            p: 0,
          },
        }}
        TransitionComponent={Grow}
        TransitionProps={{
          timeout: 220,
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            // Dark / glass look to match explorer theme
            backgroundColor: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "16px",
            overflow: "hidden",
            // Override global theme Menu styles (theme.ts overrides MuiMenu + MuiMenuItem heavily)
            "--Paper-shadow": "0px 22px 70px rgba(0,0,0,0.65), 0px 2px 14px rgba(0,0,0,0.35)",
            "--Paper-overlay": "none",
            boxShadow:
              "0px 22px 70px rgba(0,0,0,0.65), 0px 2px 14px rgba(0,0,0,0.35) !important",
            "& .MuiButtonBase-root": {
              border: "none !important",
            },
            "& .MuiMenuItem-root": {
              background: "transparent !important",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              // subtle inner highlight like premium glass panels
              boxShadow: "inset 0px 1px 0px rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        <Box sx={{ width: { xs: 390, sm: 720, md: 1180 }, maxWidth: "calc(100vw - 32px)" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
              minHeight: { xs: "auto", md: 340 },
            }}
          >
            {/* Left info card (etherscan-like) */}
            <Box
              sx={{
                p: { xs: 2, md: 2.5 },
                backgroundColor: "rgba(17,17,17,0.62)",
                borderRight: { xs: "none", md: "1px solid rgba(255,255,255,0.08)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.92)",
                  mb: 0.75,
                }}
              >
                Tools & Services
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.875rem", md: "0.9rem" },
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,0.65)",
                  mb: 2,
                }}
              >
                Discover more of Klyntar’s tools and services in one place.
              </Typography>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mt: 2 }} />
            </Box>

            {/* Right columns */}
        <Box
          sx={{
                p: { xs: 2, md: 2.5 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: { xs: 2, md: 3 },
                maxHeight: "min(560px, calc(100vh - 120px))",
                overflow: "auto",
          }}
        >
          {dropdownKeys.map((columnTitle) => (
            <Box key={columnTitle}>
              <Typography
                variant="subtitle1"
                sx={{
                      fontSize: { xs: "0.75rem", md: "0.75rem" },
                      textTransform: "uppercase",
                      letterSpacing: { xs: "0.22em", md: "0.28em" },
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 600,
                  mb: { xs: 1, md: 1.25 },
                }}
              >
                {columnTitle}
              </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {dropdownData[columnTitle].map(({ name, icon: Icon, badge, url, external }, idx) => (
                  <MenuItem
                    key={name}
                    component={url ? "a" : "li"}
                    href={url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={handleClose}
                    sx={{
                          // pill buttons on dark panel
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.92)",
                      display: "flex",
                      alignItems: "center",
                          justifyContent: "space-between",
                          px: { xs: 1, md: 1.25 },
                          py: { xs: 1, md: 1 },
                          borderRadius: "12px",
                          // keep items "clean" (no always-on outline); show outline only on hover/focus
                          border: "1px solid transparent",
                          boxShadow:
                            "0px 14px 28px rgba(0,0,0,0.35), inset 0px 1px 0px rgba(255,255,255,0.06)",
                          transition:
                            "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.075)",
                            borderColor: "rgba(255,255,255,0.14)",
                          },
                          "&:active": {
                            transform: "translateY(1px)",
                          },
                          "&:focus-visible": {
                            outline: "2px solid rgba(122,238,229,0.55)",
                            outlineOffset: "2px",
                            borderColor: "rgba(255,255,255,0.18)",
                          },
                          "@keyframes klyMegaItemIn": {
                            "0%": { opacity: 0, transform: "translateY(-6px)" },
                            "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                          animation: open
                            ? "klyMegaItemIn 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both"
                            : "none",
                          animationDelay: open ? `${60 + idx * 35}ms` : "0ms",
                    }}
                  >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                          <Icon sx={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.72)" }} />
                          <Typography sx={{ fontSize: "0.92rem", letterSpacing: "-0.01em" }}>
                        {name}
                      </Typography>
                    </Box>

                        {badge ? (
                          <Box
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              px: 0.85,
                              py: 0.25,
                              borderRadius: "999px",
                              backgroundColor: "rgba(0,0,0,0.35)",
                              color: "rgba(255,255,255,0.82)",
                              letterSpacing: "0.02em",
                              border: "1px solid rgba(255,255,255,0.10)",
                            }}
                          >
                            {badge}
                          </Box>
                        ) : null}
                  </MenuItem>
                ))}
              </Box>
            </Box>
          ))}
            </Box>
          </Box>
        </Box>
      </Menu>
      <Box
        sx={{
          display: "flex",
          gap: 0.75,
          alignItems: "center",
          px: 0,
          ml: 0,
          // No "group outline" — each social button has its own outline
          border: "none",
          backgroundColor: "transparent",
          backdropFilter: "none",
          flexWrap: variant === "mobile" ? "wrap" : "nowrap",
        }}
      >
        {socialLinks.map(({ icon: Icon, url }, idx) => (
          <Button
            key={url}
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              // In header (tight space): keep it compact on xs.
              // In mobile menu: show all icons.
              display:
                variant === "mobile"
                  ? "grid"
                  : ({ xs: idx < 3 ? "grid" : "none", lg: "grid" } as any),
              p: 0,
              minWidth: 0,
              width: { xs: 38, md: 40 },
              height: { xs: 38, md: 40 },
              borderRadius: "999px",
              // Per-button outline (match Faucet button)
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "rgba(17,17,17,0.30)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 16px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
              transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
              placeItems: "center",
              lineHeight: 0,
              color: "rgba(255,255,255,0.92)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.92)",
                borderColor: "rgba(255,255,255,0.92)",
                color: "#000",
                transform: "translateY(-1px)",
              },
              "&:active": { transform: "translateY(0px)" },
            }}
          >
            <Icon sx={{ fontSize: 18, display: "block", color: "inherit" }} />
          </Button>
        ))}
      </Box>
    </Box>
  );
};
