import { Metadata } from "next";
import { ContentBlock, EntityPageLayout, PageContainer, GradientBackground, DimGradientBackground } from "@/components/ui";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { fetchPoolById } from "@/data";
import { truncateMiddle } from "@/helpers";
import { StakersTable } from "./StakersTable";
import Web3 from "web3";
import { Language, Telegram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import Discord from "@public/icons/social/Discord.svg";
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
                [
                  <ContentBlock key="staking_link" density="compact" blurred sx={glassBlockSx} title="Staking link">
                    <Button
                      component="a"
                      variant="outlined"
                      href={`https://portal.klyntar.org/stake?validator=${poolId.split("(")[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="StakingLink"
                      sx={actionButtonSx}
                    >
                      Stake
                    </Button>
                  </ContentBlock>,
                  <ContentBlock key="multistaking_link" density="compact" blurred sx={glassBlockSx} title="Multistaking link">
                    <Button
                      component="a"
                      variant="outlined"
                      href={`https://portal.klyntar.org/multistake?validator=${poolId.split("(")[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="MultistakingLink"
                      sx={actionButtonSx}
                    >
                      Multistake
                    </Button>
                  </ContentBlock>,
                ],
                [
                  <ContentBlock key="socials" density="compact" blurred sx={glassBlockSx} title="Socials">
                    <Box display="flex" gap={2}>
                      <IconButton
                        component="a"
                        href={"https://x.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        sx={socialIconSx}
                      >
                        <XIcon />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={"https://klyntar.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        sx={socialIconSx}
                      >
                        <Language />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={"https://discord.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                        sx={socialIconSx}
                      >
                        <Discord />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={"https://telegram.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        sx={socialIconSx}
                      >
                        <Telegram />
                      </IconButton>
                    </Box>
                  </ContentBlock>,
                  <ContentBlock key="shard" density="compact" blurred sx={glassBlockSx} title="Creation shard" value={pool.poolOriginShard} />,
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

const actionButtonSx = {
  width: "208px",
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
};

const glassBlockSx = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: { xs: "0.75rem", md: "1rem" },
  backgroundColor: "rgba(0,0,0,0.55)",
  boxShadow:
    "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const socialIconSx = {
  width: 44,
  height: 44,
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.10)",
  backgroundColor: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
  transition: "all 160ms ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(0,0,0,0.45)",
    transform: "translateY(-1px)",
  },
  "& svg": {
    width: 22,
    height: 22,
  },
};
