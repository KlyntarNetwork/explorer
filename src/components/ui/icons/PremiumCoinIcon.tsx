import { Box } from "@mui/material";
import CoinIcon from "@public/icons/company/CoinIcon.svg";

export function PremiumCoinIcon({ size = 22 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.14)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 55%, rgba(0,0,0,0.18) 100%)",
        boxShadow:
          "0 8px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "middle",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 35% 25%, rgba(122,238,229,0.22) 0%, transparent 55%)",
          opacity: 0.8,
          pointerEvents: "none",
        },
        "& svg": {
          width: Math.max(14, Math.floor(size * 0.82)),
          height: Math.max(14, Math.floor(size * 0.82)),
          position: "relative",
          zIndex: 1,
          filter:
            "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(122,238,229,0.12))",
        },
      }}
    >
      <CoinIcon />
    </Box>
  );
}


