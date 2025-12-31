import { Metadata } from "next";
import { ContentBlock, EntityPageLayout, PageContainer, GradientBackground, DimGradientBackground } from "@/components/ui";
import { Box, Typography } from "@mui/material";
import { fetchPoolById } from "@/data";
import { truncateMiddle } from "@/helpers";
import { StakersTable } from "./StakersTable";
import Web3 from "web3";
import { Language, Telegram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import LaunchIcon from "@mui/icons-material/Launch";
import { DiscordIcon } from "@/components/ui/icons/DiscordIcon";
import { PoolHero } from "./PoolHero";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Pool info",
};

export default async function PoolByIdPage({ params }: Props) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <GradientBackground sx={{ backgroundColor: "#000" }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant="h1" sx={{ fontSize: { xs: "1.5rem", md: "1.85rem" } }}>
              Pool
            </Typography>
            <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.6)" }}>
              Validator pool metadata, staking power and stakers distribution.
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(17, 17, 17, 0.35)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
              p: { xs: 1.5, md: 2.25 },
            }}
          >
            <EntityPageLayout
              dense
              header={{
                title: "Pool ID",
                clipBoardValue: poolId,
                value: truncateMiddle(poolId),
                label: {
                  variant: pool.isActiveValidator ? "green" : "red",
                  value: pool.isActiveValidator ? "Active validator" : "Not enough stake",
                },
                actionText: {
                  value: `Total staking power: ${Web3.utils.fromWei(pool.poolStorage.totalStakedKly, "ether")}`,
                },
              }}
              items={[
                <ContentBlock key="socials" density="compact" blurred sx={glassBlockSx} title="Socials">
                    <Box display="flex" flexWrap="wrap" gap={1.1}>
                      <Box
                        component="a"
                        href={"https://x.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        sx={socialPillSx}
                      >
                        <Box sx={socialIconWrapSx}>
                          <XIcon sx={socialIconSx} />
                        </Box>
                        <Typography sx={socialTextSx}>X (Twitter)</Typography>
                        <LaunchIcon sx={socialExternalIconSx} />
                      </Box>
                      <Box
                        component="a"
                        href={"https://klyntar.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        sx={socialPillSx}
                      >
                        <Box sx={socialIconWrapSx}>
                          <Language sx={socialIconSx} />
                        </Box>
                        <Typography sx={socialTextSx}>Website</Typography>
                        <LaunchIcon sx={socialExternalIconSx} />
                      </Box>
                      <Box
                        component="a"
                        href={"https://discord.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                        sx={socialPillSx}
                      >
                        <Box sx={socialIconWrapSx}>
                          <DiscordIcon sx={socialIconSx} />
                        </Box>
                        <Typography sx={socialTextSx}>Discord</Typography>
                        <LaunchIcon sx={socialExternalIconSx} />
                      </Box>
                      <Box
                        component="a"
                        href={"https://telegram.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        sx={socialPillSx}
                      >
                        <Box sx={socialIconWrapSx}>
                          <Telegram sx={socialIconSx} />
                        </Box>
                        <Typography sx={socialTextSx}>Telegram</Typography>
                        <LaunchIcon sx={socialExternalIconSx} />
                      </Box>
                    </Box>
                  </ContentBlock>,
                [
                  <ContentBlock
                    key="staking_link"
                    density="compact"
                    blurred
                    url={`https://portal.klyntar.org/stake?validator=${poolId.split("(")[0]}`}
                    sx={linkTileSx}
                    title="Staking link"
                  >
                    <Box sx={linkTileInnerSx}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={linkTileTitleSx}>Stake via portal</Typography>
                        <Typography sx={linkTileSubtitleSx}>portal.klyntar.org</Typography>
                      </Box>
                      <LaunchIcon sx={linkTileIconSx} />
                    </Box>
                  </ContentBlock>,
                  <ContentBlock
                    key="multistaking_link"
                    density="compact"
                    blurred
                    url={`https://portal.klyntar.org/multistake?validator=${poolId.split("(")[0]}`}
                    sx={linkTileSx}
                    title="Multistaking link"
                  >
                    <Box sx={linkTileInnerSx}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={linkTileTitleSx}>Multistake via portal</Typography>
                        <Typography sx={linkTileSubtitleSx}>portal.klyntar.org</Typography>
                      </Box>
                      <LaunchIcon sx={linkTileIconSx} />
                    </Box>
                  </ContentBlock>,
                ],
                [
                  <ContentBlock
                    key="quorum_member_status"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="In current quorum"
                    value={pool.isCurrentQuorumMember ? "Yes" : "No"}
                  />,
                  <ContentBlock
                    key="percentage"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Percentage"
                    value={pool.poolStorage.percentage + "% (takes the pool)"}
                  />,
                ],
                [
                  <ContentBlock
                    key="kly"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Staked KLY"
                    value={Web3.utils.fromWei(pool.poolStorage.totalStakedKly, "ether")}
                  />,
                  <ContentBlock
                    key="uno"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Staked UNO (multistaking points)"
                    value={Web3.utils.fromWei(pool.poolStorage.totalStakedUno, "ether")}
                  />,
                ],
              ]}
            >
              <PoolHero />
            </EntityPageLayout>
          </Box>

          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(17, 17, 17, 0.35)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
              p: { xs: 1.5, md: 2.25 },
            }}
          >
            <Typography variant="h1" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              Stakers
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "rgba(255,255,255,0.6)" }}>
              Stake distribution across accounts.
            </Typography>
            <StakersTable
              poolStakers={pool.poolStorage.stakers}
              poolOriginShard={pool.poolOriginShard}
              variant="glass"
              dense
            />
          </Box>
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}

const glassBlockSx = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: { xs: "0.75rem", md: "1rem" },
  background: "rgba(0,0,0,0.55)",
  boxShadow:
    "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const linkTileSx = {
  ...glassBlockSx,
  transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.62)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  "&:focus-within": {
    outline: "2px solid rgba(122,238,229,0.26)",
    outlineOffset: 2,
  },
};

const linkTileInnerSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.25,
};

const linkTileTitleSx = {
  fontSize: { xs: "0.95rem", md: "1.05rem" },
  lineHeight: 1.1,
  color: "rgba(255,255,255,0.92)",
  fontWeight: 500,
};

const linkTileSubtitleSx = {
  mt: 0.15,
  fontSize: "0.72rem",
  lineHeight: 1.1,
  color: "rgba(255,255,255,0.55)",
};

const linkTileIconSx = {
  fontSize: 18,
  color: "rgba(255,255,255,0.58)",
  flex: "0 0 auto",
};

const socialPillSx = {
  height: 36,
  px: 1.1,
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.10)",
  backgroundColor: "rgba(0,0,0,0.22)",
  display: "inline-flex",
  alignItems: "center",
  gap: 0.8,
  textDecoration: "none",
  transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(0,0,0,0.30)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  "&:focus-visible": {
    outline: "2px solid rgba(122,238,229,0.30)",
    outlineOffset: 2,
  },
};

const socialIconWrapSx = {
  width: 18,
  height: 18,
  display: "grid",
  placeItems: "center",
  lineHeight: 0,
  flex: "0 0 auto",
  overflow: "visible",
};

const socialIconSx = {
  width: 18,
  height: 18,
  display: "block",
  color: "rgba(255,255,255,0.78)",
  flex: "0 0 auto",
};

const socialTextSx = {
  fontSize: "0.8rem",
  lineHeight: 1,
  color: "rgba(255,255,255,0.82)",
};

const socialExternalIconSx = {
  fontSize: 16,
  display: "block",
  color: "rgba(255,255,255,0.55)",
  ml: 0.15,
};
