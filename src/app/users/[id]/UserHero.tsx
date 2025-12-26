import { Box } from "@mui/material";

export function UserHero() {
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
          animation: "userFloat 4.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
          "@keyframes userFloat": {
            "0%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
            "50%": { transform: "translateY(-18px) rotate(1.6deg) scale(1.012)" },
            "100%": { transform: "translateY(12px) rotate(-1.2deg) scale(0.995)" },
          },
        }}
      >
        <defs>
          <linearGradient id="cardStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="0.45" stopColor="rgba(122,238,229,0.20)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.10)" />
          </linearGradient>
          <linearGradient id="cardFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.09)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <radialGradient id="cardHolo" cx="30%" cy="25%" r="70%">
            <stop offset="0" stopColor="rgba(122,238,229,0.35)" />
            <stop offset="0.55" stopColor="rgba(122,238,229,0.10)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="cardLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(122,238,229,0.75)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>

        {/* subtle holographic bloom */}
        <circle cx="108" cy="96" r="86" fill="url(#cardHolo)" opacity="0.75" />

        {/* back card */}
        <g opacity="0.7" transform="translate(8,10) rotate(-10 110 110)">
          <rect
            x="54"
            y="64"
            width="118"
            height="86"
            rx="16"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </g>

        {/* front card (ID badge) */}
        <g transform="rotate(-10 110 110)">
          <rect
            x="48"
            y="58"
            width="124"
            height="94"
            rx="18"
            fill="url(#cardFill)"
            stroke="url(#cardStroke)"
            strokeWidth="1.25"
          />

          {/* avatar dot */}
          <circle
            cx="78"
            cy="88"
            r="13"
            fill="rgba(0,0,0,0.18)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <circle cx="78" cy="86" r="5.2" fill="rgba(122,238,229,0.65)" opacity="0.85" />
          <path
            d="M66 108 C 70 99, 76 96, 78 96 C 80 96, 86 99, 90 108"
            stroke="rgba(122,238,229,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />

          {/* text lines */}
          <rect x="100" y="80" width="54" height="6" rx="3" fill="url(#cardLine)" opacity="0.75" />
          <rect x="100" y="94" width="42" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="100" y="108" width="48" height="6" rx="3" fill="rgba(255,255,255,0.08)" />

          {/* chip */}
          <rect
            x="54"
            y="124"
            width="28"
            height="18"
            rx="6"
            fill="rgba(0,0,0,0.18)"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          <path
            d="M60 133 H 76"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M60 138 H 70"
            stroke="rgba(122,238,229,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </Box>
    </Box>
  );
}


