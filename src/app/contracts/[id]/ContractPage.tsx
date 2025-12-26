"use client";

import { fetchAccountById, fetchAccountTransactions } from "@/data";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { formatOrdinal, truncateMiddle } from "@/helpers";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  TransactionsTable,
} from "@/components/ui";
import { ContractAccount, TransactionPreview } from "@/definitions";
import NotFoundPage from "@/app/not-found";
import Web3 from "web3";
import { CircularProgress } from "@mui/material";
import { InteractionSection } from "../InteractionSection";
import { ContractHero } from "./ContractHero";

interface Props {
  params: {
    id: string;
  };
  forceEntityStub?: boolean;
}

export default function ContractPage({ params, forceEntityStub }: Props) {
  const [contract, setContract] = useState<ContractAccount | null>(null);
  const [transactions, setTransactions] = useState<TransactionPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemContractUI, setSystemContractUI] = useState(false);
  const [shardId, setShardId] = useState("");
  const [contractId, setContractId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const decodedComponent = decodeURIComponent(params.id);

      let shardId = "";
      let contractId = "";
      let systemContractUI = false;

      if (!decodedComponent.includes(":")) {
        // If it looks like an EVM address, default to shard 0 (dev-friendly).
        if (decodedComponent.startsWith("0x") && decodedComponent.length === 42) {
          systemContractUI = false;
          shardId = "0";
          contractId = decodedComponent.toLowerCase();
        } else {
          systemContractUI = true;
          shardId = "x";
          contractId = decodedComponent;
        }
      } else {
        let [shardID, contractID] = decodedComponent.split(":");
        shardId = shardID;
        contractId = contractID;
      }

      setShardId(shardId);
      setContractId(contractId);
      setSystemContractUI(systemContractUI);

      try {
        const contractData = await fetchAccountById(shardId, contractId, { forceStub: forceEntityStub });
        const transactionsData = await fetchAccountTransactions(shardId, contractId, { forceStub: forceEntityStub });
        // In dev/stub mode we might not be able to classify accounts reliably.
        // If the user navigates to /contracts, prefer showing the contract UI instead of 404.
        const asAny = contractData as any;
        const normalized =
          asAny?.type === "contract"
            ? (contractData as ContractAccount)
            : ({
                type: "contract",
                lang: "EVM",
                balance: asAny?.balance ?? "0",
                gas: asAny?.gas ?? 0,
                storages: [],
                storageAbstractionLastPayment: Date.now(),
              } as ContractAccount);

        setContract(normalized);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "65vh",
        }}
      >
        <CircularProgress
          sx={{
            color: "white",
            animation: "rotate 1.5s linear infinite",
            width: "50px",
            height: "50px",
          }}
        />
      </Box>
    );
  }

  if (!contract || contract.type !== "contract") {
    return <NotFoundPage />;
  }

  return (
    <>
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
          title: "Account info",
          clipBoardValue: contractId,
          value: truncateMiddle(contractId),
          label: { variant: "green", value: "Contract" },
        }}
        items={[
          <ContentBlock
            key="contract_id"
            density="compact"
            blurred
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(0,0,0,0.55)",
              boxShadow:
                "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            title="Contract Id"
            value={contractId}
          />,
          <ContentBlock
            key="aliases"
            density="compact"
            blurred
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(0,0,0,0.55)",
              boxShadow:
                "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            title="Also known as"
          >
            <Label variant="blue">N/A</Label>
          </ContentBlock>,
          [
            <ContentBlock
              key="shard"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Shard"
              value={shardId}
            />,
            <ContentBlock
              key="balance"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Balance"
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
                {Web3.utils.fromWei(contract.balance, "ether")}
              </Typography>
            </ContentBlock>,
          ],
          [
            <ContentBlock
              key="last_payment_for_storage_usage"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Last storage payment"
              value={
                formatOrdinal(contract.storageAbstractionLastPayment) + " epoch"
              }
            />,
            <ContentBlock
              key="abstract_gas"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Abstract gas"
              value={contract.gas}
            />,
          ],
          <ContentBlock
            key="language"
            density="compact"
            blurred
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(0,0,0,0.55)",
              boxShadow:
                "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            title="Environment"
          >
            <Label variant={getColorForLanguage(contract.lang)}>
              {contract.lang}
            </Label>
          </ContentBlock>,
          !systemContractUI && (
            <ContentBlock
              key="list_of_storage_cells"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Storage cells"
            >
              {contract.storages.map((storage) => (
                <Typography key={storage} color="primary.main">
                  • {storage}
                </Typography>
              ))}
            </ContentBlock>
          ),
        ]}
      >
        <ContractHero />
      </EntityPageLayout>
      </Box>

      <TabSection contractId={contractId} transactions={transactions} />
    </>
  );
}

function TabSection({
  contractId,
  transactions,
}: {
  contractId: string;
  transactions: TransactionPreview[];
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
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
      <Tabs
        sx={{
          mb: { xs: 2, md: 2.5 },
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          "& .MuiTab-root": {
            color: "rgba(255,255,255,0.65)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: { xs: "0.6875rem", md: "0.75rem" },
            minHeight: 44,
            py: 1.25,
          },
          "& .Mui-selected": {
            color: "rgba(255,255,255,0.92)",
          },
          "& .MuiTabs-indicator": {
            height: "2px",
            background:
              "linear-gradient(90deg, rgba(122,238,229,0.9) 0%, rgba(255,49,49,0.65) 100%)",
          },
        }}
        value={tabIndex}
        onChange={(_, newIndex) => setTabIndex(newIndex)}
        variant="scrollable"
        scrollButtons={"auto"}
        allowScrollButtonsMobile
      >
        <Tab label="Transactions" />
        <Tab label="Staking data" />
        <Tab label="Portfolio" />
        <Tab label="Source code" />
        <Tab label="Interaction" />
        <Tab label="Storage" />
        <Tab label="Events" />
        <Tab label="Analytics" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Typography variant="h1" sx={{ mt: 1, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
            Transactions
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: "rgba(255,255,255,0.6)" }}>
            Browse through the latest 200 transactions below
          </Typography>
          <TransactionsTable transactions={transactions.reverse()} variant="glass" dense />
        </>
      )}
      {tabIndex === 1 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 2 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 3 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 4 && (
        <Box
          sx={{
            mt: 2,
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: { xs: "0.75rem", md: "1rem" },
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            p: { xs: 1.5, md: 2.25 },
          }}
        >
          <InteractionSection address={contractId} />
        </Box>
      )}
      {tabIndex === 5 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 6 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 7 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
    </Box>
  );
}

function getColorForLanguage(
  lang: string
): "blue" | "red" | "orange" | "silver" | "green" {
  const langLower = lang.toLowerCase();
  return langLower === "assemblyscript"
    ? "blue"
    : langLower === "rust"
    ? "red"
    : langLower === "solidity"
    ? "orange"
    : langLower.includes("system")
    ? "silver"
    : "green";
}
