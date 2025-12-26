import { Metadata } from "next";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  PageContainer,
} from "@/components/ui";
import { DimGradientBackground, GradientBackground } from "@/components/ui";
import { TxTabs } from "./TxTabs";
import {
  describeTransactionCreatorFormat,
  fetchAccountById,
  fetchTransactionByTxHash,
} from "@/data";
import { truncateMiddle } from "@/helpers";
import { TX_TYPE } from "@/definitions";
import Web3 from "web3";
import { Box, Typography } from "@mui/material";

interface Props {
  params: {
    hash: string;
  };
  searchParams?: {
    tab?: string;
  };
}

export const metadata: Metadata = {
  title: "Transaction info",
};

export default async function TransactionByIdPage({ params, searchParams }: Props) {
  const txHash = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(txHash);

  // In case it's EVM account - make this request to check the EVM account type (if it's EOA or contract)

  const interactedWithAccount = await fetchAccountById(tx.shard, tx.payload.to);

  // Depending on tx type we need to visualize if it's interaction with a contract or average transaction (address => address)

  let contentBlock = null;

  if (tx.createdContractAddress) {
    contentBlock = (
      <ContentBlock
        key="created_contract_address"
        density="compact"
        blurred
        sx={glassBlockSx}
        title="Created contract:"
        value={tx.createdContractAddress}
        url={`/contracts/${tx.shard}:${tx.createdContractAddress}`}
      />
    );
  } else if (
    tx.type === TX_TYPE.EVM_CALL &&
    interactedWithAccount.type === "contract"
  ) {
    contentBlock = (
      <ContentBlock
        key="called_contract"
        density="compact"
        blurred
        sx={glassBlockSx}
        title="Called contract:"
        value={truncateMiddle(tx.payload.to)}
        comment={describeTransactionCreatorFormat(tx.payload.to)}
        url={
          tx.payload.to.includes("system")
            ? `/contracts/${tx.payload.to.split("/")[1]}`
            : `/contracts/${tx.shard}:${tx.payload.to}`
        }
      />
    );
  } else if (tx.payload.to) {
    contentBlock = (
      <ContentBlock
        key="recipient"
        density="compact"
        blurred
        sx={glassBlockSx}
        title="Recipient:"
        value={truncateMiddle(tx.payload.to)}
        comment={describeTransactionCreatorFormat(tx.payload.to)}
        url={`/users/${tx.shard}:${tx.payload.to}`}
      />
    );
  } else if (tx.payload.contractID) {
    contentBlock = (
      <ContentBlock
        key="called_contract"
        density="compact"
        blurred
        sx={glassBlockSx}
        title="Called contract:"
        value={truncateMiddle(tx.payload.contractID)}
        url={`/contracts/${tx.shard}:${tx.payload.contractID}`}
      />
    );
  }

  const detailsToVisualize = {
    executionStatus: {
      isOk: tx.isOk,
      reason: (tx as any).reason,
      blockID: (tx as any).blockID,
      order: tx.order,
      createdContractAddress: (tx as any).createdContractAddress,
      extraDataToReceipt: (tx as any).extraDataToReceipt,
      priorityFee: tx.priorityFee,
      totalFee: tx.totalFee,
    },
    txData: {
      version: (tx as any).v,
      shard: tx.shard,
      txid: tx.txHash,
      txType: tx.type,
      creator: tx.creator,
      fee: tx.fee,
      nonce: tx.nonce,
      sigType: tx.sigType,
      sig: tx.sig,
      payload: tx.payload,
    },
  };

  return (
    <GradientBackground sx={{ backgroundColor: "#000" }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant="h1" sx={{ fontSize: { xs: "1.5rem", md: "1.85rem" } }}>
              Transaction
            </Typography>
            <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.6)" }}>
              Inspect transaction metadata, fees, participants and payload.
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
                title: "Transaction ID",
                clipBoardValue: tx.txHash,
                value: truncateMiddle(tx.txHash),
                label: {
                  variant: tx.isOk ? "green" : "red",
                  value: tx.isOk ? "Success" : "Failed",
                },
              }}
              items={[
                <ContentBlock
                  key="shard"
                  density="compact"
                  blurred
                  sx={glassBlockSx}
                  title="Shard"
                  value={tx.shard}
                />,
                [
                  <ContentBlock
                    key="creator"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Creator"
                    value={truncateMiddle(tx.creator)}
                    comment={tx.creatorFormatDescription}
                    url={`/users/${tx.shard}:${tx.creator}`}
                  />,
                  contentBlock,
                ],
                [
                  <ContentBlock
                    key="type"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Type"
                    value={tx.type}
                    comment={tx.typeDescription}
                  />,
                  <ContentBlock
                    key="coins"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Coins transferred"
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        lineHeight: 1.25,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      color="primary.main"
                    >
                      {Web3.utils.fromWei(
                        tx.payload.amount || tx.payload.value || "0",
                        "ether"
                      )}
                    </Typography>
                  </ContentBlock>,
                  <ContentBlock
                    key="nonce"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Nonce"
                    value={tx.nonce}
                  />,
                ],
                <ContentBlock
                  key="signature"
                  density="compact"
                  blurred
                  sx={glassBlockSx}
                  title="Signature"
                  value={tx.sig}
                />,
                <ContentBlock
                  key="256_bit_tx_hash"
                  density="compact"
                  blurred
                  sx={glassBlockSx}
                  title="256-bit tx hash"
                  value={tx.txHash}
                />,
                [
                  <ContentBlock
                    key="parallelization_type"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Execution type"
                  >
                    <Label variant={Array.isArray(tx.payload.touchedAccounts) ? "green" : "red"}>
                      {Array.isArray(tx.payload.touchedAccounts)
                        ? "Parallel execution"
                        : "Non-parallel execution"}
                    </Label>
                  </ContentBlock>,
                  <ContentBlock
                    key="fee_details"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Fee details"
                  >
                    <Label variant="blue">
                      {tx.payload.gasAbstraction
                        ? "Account Abstraction 2.0"
                        : "Fee paid in native coin"}
                    </Label>
                  </ContentBlock>,
                ],
                [
                  <ContentBlock
                    key="proposed_fee"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Priority fee"
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        lineHeight: 1.25,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      color="primary.main"
                    >
                      {tx.priorityFee ? Web3.utils.fromWei(tx.priorityFee, "ether") : "0"}
                    </Typography>
                  </ContentBlock>,
                  <ContentBlock
                    key="real_fee"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Total charged fee"
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        lineHeight: 1.25,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      color="primary.main"
                    >
                      {tx.totalFee ? Web3.utils.fromWei(tx.totalFee, "ether") : "0"}
                    </Typography>
                  </ContentBlock>,
                ],
                [
                  <ContentBlock
                    key="included_in_block"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Included in block"
                    value={tx.block.truncatedId}
                    url={`/blocks/${tx.block.id}`}
                  />,
                  <ContentBlock
                    key="position_in_block"
                    density="compact"
                    blurred
                    sx={glassBlockSx}
                    title="Position in block"
                    value={tx.order}
                  />,
                ],
              ]}
            />
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
              whiteSpace: "nowrap",
            }}
          >
            <TxTabs
              initialTab={searchParams?.tab}
              rawDetails={detailsToVisualize as any}
              evmBytecode={tx.type === TX_TYPE.EVM_CALL ? tx.payload.evmBytecode : ""}
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
  backgroundColor: "rgba(0,0,0,0.55)",
  boxShadow:
    "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
};
