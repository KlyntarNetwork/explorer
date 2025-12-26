"use client";

import React, { useState, useEffect } from "react";
import NotFoundPage from "@/app/not-found";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  TransactionsTable,
} from "@/components/ui";
import { fetchAccountById, fetchAccountTransactions } from "@/data";
import { truncateMiddle } from "@/helpers";
import { TransactionPreview, UserAccount } from "@/definitions";
import Web3 from "web3";
import { UserHero } from "./UserHero";

interface Props {
  params: {
    id: string;
  };
  forceEntityStub?: boolean;
}

export default function UserPage({ params, forceEntityStub }: Props) {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [transactions, setTransactions] = useState<TransactionPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [shard, setShard] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const parts = decodeURIComponent(params.id).split(":");
      let shard = parts.length >= 2 ? parts[0] : "0";
      let accountId = parts.length >= 2 ? parts[1] : parts[0];
      accountId = accountId.startsWith("0x")
        ? accountId.toLowerCase()
        : accountId;
      setShard(shard);
      setAccountId(accountId);

      try {
        const accountData = await fetchAccountById(shard, accountId, { forceStub: forceEntityStub });
        const transactionsData = await fetchAccountTransactions(shard, accountId, { forceStub: forceEntityStub });
        setAccount(accountData as UserAccount);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching account data:", error);
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

  if (!account || account.type !== "eoa") {
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
          clipBoardValue: accountId,
          value: truncateMiddle(accountId),
          label: {
            variant: "green",
            value: "User",
          },
        }}
        items={[
          <ContentBlock
            key="account_id"
            density="compact"
            blurred
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "rgba(0,0,0,0.55)",
              boxShadow:
                "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            title="Account Id"
            value={accountId}
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
              value={shard}
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
                {Web3.utils.fromWei(account.balance, "ether")}
              </Typography>
            </ContentBlock>,
          ],
          [
            <ContentBlock
              key="nonce"
              density="compact"
              blurred
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: { xs: "0.75rem", md: "1rem" },
                backgroundColor: "rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              title="Nonce"
              value={account.nonce}
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
              value={account.gas}
            />,
          ],
        ]}
      >
        <UserHero />
      </EntityPageLayout>
      </Box>

      <TabSection transactions={transactions} />
    </>
  );
}

function TabSection({ transactions }: { transactions: TransactionPreview[] }) {
  const [activeTab, setActiveTab] = useState(0);

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
        value={activeTab}
        onChange={(_, newIndex) => setActiveTab(newIndex)}
        variant="scrollable"
        scrollButtons={'auto'}
        allowScrollButtonsMobile
      >
        <Tab label="Transactions" />
        <Tab label="Staking data" />
        <Tab label="Portfolio" />
        <Tab label="Analytics" />
      </Tabs>

      {activeTab === 0 && (
        <>
          <Typography variant="h1" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
            Transactions
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, color: "rgba(255,255,255,0.6)" }}>
            Browse through the latest 200 transactions below
          </Typography>
          <TransactionsTable transactions={transactions.reverse()} variant="glass" dense />
        </>
      )}
      {activeTab === 1 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
      {activeTab === 2 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
      {activeTab === 3 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
    </Box>
  );
}
