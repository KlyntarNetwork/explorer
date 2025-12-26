"use client";

import { Box, Button } from "@mui/material";

export const InteractionSection = ({
  address,
}: {
  address: string;
}) => {
  const handleRedirect = () => {
    const url = `https://portal.klyntar.org/contract-interaction?contract=${encodeURIComponent(
      address
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleRedirect}
        sx={{
          borderColor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.85)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: { xs: "0.6875rem", md: "0.75rem" },
          px: { xs: 3, md: 4 },
          py: { xs: 1.25, md: 1.5 },
          borderRadius: { xs: "0.75rem", md: "1rem" },
          backgroundColor: "rgba(17, 17, 17, 0.4)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.2)",
            backgroundColor: "rgba(17, 17, 17, 0.6)",
            color: "#fff",
          },
        }}
      >
        Interact via portal
      </Button>
    </Box>
  );
};
