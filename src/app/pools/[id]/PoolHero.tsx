import { Box } from "@mui/material";

export function PoolHero() {
  return (
    <Box
      aria-hidden
      sx={{
        width: { xs: 240, md: 320 },
        height: { xs: 240, md: 320 },
        maxWidth: "100%",
        borderRadius: { xs: "1rem", md: "1.25rem" },
        border: "1px solid rgba(255,255,255,0.10)",
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(14px)",
        boxShadow:
          "0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 220 220"
        sx={{
          width: { xs: 210, md: 260 },
          height: { xs: 210, md: 260 },
          filter:
            "drop-shadow(0 22px 46px rgba(0,0,0,0.6)) drop-shadow(0 0 26px rgba(122,238,229,0.10))",
          animation: "poolFloat 4.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
          "@keyframes poolFloat": {
            "0%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
            "50%": { transform: "translateY(-18px) rotate(1.6deg) scale(1.012)" },
            "100%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
          },
        }}
      >
        <defs>
          <linearGradient id="pStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="0.55" stopColor="rgba(122,238,229,0.18)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.10)" />
          </linearGradient>
          <linearGradient id="pFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <radialGradient id="pGlow" cx="30%" cy="25%" r="70%">
            <stop offset="0" stopColor="rgba(122,238,229,0.26)" />
            <stop offset="0.6" stopColor="rgba(122,238,229,0.10)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <circle cx="110" cy="104" r="86" fill="url(#pGlow)" opacity="0.8" />

        {/* pool "hub" with connected nodes */}
        <g transform="rotate(-10 110 110)">
          <circle cx="110" cy="110" r="34" fill="url(#pFill)" stroke="url(#pStroke)" strokeWidth="1.25" />
          <circle cx="110" cy="110" r="10" fill="rgba(122,238,229,0.55)" opacity="0.9" />

          <circle cx="66" cy="86" r="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          <circle cx="154" cy="86" r="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          <circle cx="78" cy="150" r="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          <circle cx="142" cy="150" r="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

          <path d="M88 96 L74 90" stroke="rgba(122,238,229,0.35)" strokeWidth="2" strokeLinecap="round" />
          <path d="M132 96 L146 90" stroke="rgba(122,238,229,0.35)" strokeWidth="2" strokeLinecap="round" />
          <path d="M96 132 L84 144" stroke="rgba(122,238,229,0.28)" strokeWidth="2" strokeLinecap="round" />
          <path d="M124 132 L136 144" stroke="rgba(122,238,229,0.28)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </Box>
    </Box>
  );
}


