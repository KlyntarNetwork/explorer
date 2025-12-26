import { Box } from "@mui/material";

export function ContractHero() {
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
          animation: "contractFloat 4.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
          "@keyframes contractFloat": {
            "0%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
            "50%": { transform: "translateY(-18px) rotate(1.6deg) scale(1.012)" },
            "100%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
          },
        }}
      >
        <defs>
          <linearGradient id="cStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="0.55" stopColor="rgba(122,238,229,0.20)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.10)" />
          </linearGradient>
          <linearGradient id="cFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <radialGradient id="cGlow" cx="30%" cy="25%" r="70%">
            <stop offset="0" stopColor="rgba(122,238,229,0.30)" />
            <stop offset="0.6" stopColor="rgba(122,238,229,0.10)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <circle cx="110" cy="102" r="86" fill="url(#cGlow)" opacity="0.8" />

        {/* code card */}
        <g transform="rotate(-10 110 110)">
          <rect x="48" y="58" width="124" height="100" rx="18" fill="url(#cFill)" stroke="url(#cStroke)" strokeWidth="1.25" />

          {/* braces */}
          <path d="M82 92 C72 92, 72 104, 82 104" stroke="rgba(122,238,229,0.70)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M138 92 C148 92, 148 104, 138 104" stroke="rgba(122,238,229,0.70)" strokeWidth="3.2" strokeLinecap="round" fill="none" />

          {/* lines */}
          <rect x="92" y="88" width="36" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="92" y="102" width="48" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="116" width="28" height="6" rx="3" fill="rgba(255,255,255,0.06)" />

          {/* chip */}
          <rect x="54" y="128" width="30" height="20" rx="7" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <path d="M60 138 H 78" stroke="rgba(255,255,255,0.14)" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </Box>
    </Box>
  );
}


