"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { majorMonoDisplay } from "@/styles/theme";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#000',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        px: { xs: 2, md: 3 },
        py: { xs: '8rem', md: '10rem' },
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
          animation: 'backgroundGlowPulse 10s ease-in-out infinite',
          '@keyframes backgroundGlowPulse': {
            '0%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
            '50%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '100%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontFamily: majorMonoDisplay.style.fontFamily,
            fontSize: { xs: '5rem', md: '7rem' },
            color: 'rgba(255, 49, 49, 0.9)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.2em', md: '0.25em' },
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
          }}
        >
          Page not found
        </Typography>
        <Button
          variant="outlined"
          onClick={handleGoBack}
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: { xs: '0.6875rem', md: '0.75rem' },
            px: { xs: 3, md: 4 },
            py: { xs: 1.25, md: 1.5 },
            backgroundColor: 'rgba(17, 17, 17, 0.4)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(17, 17, 17, 0.6)',
              color: '#fff',
            },
          }}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
