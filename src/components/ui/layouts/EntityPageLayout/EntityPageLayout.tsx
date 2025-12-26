"use client";
import { FC, ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Label } from "@/components/ui";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CloseIcon from "@mui/icons-material/Close";
import QRCodeStyling from "qr-code-styling";

interface Props {
  children?: ReactNode;
  dense?: boolean;
  header: {
    clipBoardValue?: string;
    title: string;
    value: string;
    label: {
      variant: "red" | "green" | "blue";
      value: string | number;
    };
    actionText?: {
      url?: string;
      value: string;
    };
  };
  items: Array<ReactNode | Array<ReactNode>>;
}

export const EntityPageLayout: FC<Props> = ({
  children: entityImage,
  dense = false,
  header,
  items,
}) => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(header.clipBoardValue || "")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const openQr = () => setIsQrOpen(true);
  const closeQr = () => setIsQrOpen(false);

  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!header.clipBoardValue) return;

    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "svg",
        data: header.clipBoardValue,
        dotsOptions: {
          color: "#000000",
          type: "classy",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#000000",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
      });
    }

    // Dialog contents are portaled; ensure the ref is mounted before appending.
    if (!isQrOpen) return;

    let cancelled = false;
    const tryAppend = () => {
      if (cancelled) return;
      if (!qrInstance.current) return;

      // Keep data in sync when navigating between entities.
      (qrInstance.current as any).update?.({ data: header.clipBoardValue });

      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrInstance.current.append(qrRef.current);
        return;
      }

      requestAnimationFrame(tryAppend);
    };

    tryAppend();
    return () => {
      cancelled = true;
    };
  }, [isQrOpen, header.clipBoardValue]);

  const layoutHeader = (
    <Grid item xs={12}>
      <Typography variant="caption">{header.title}</Typography>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography
            variant="h1"
            sx={{
              my: dense ? 0.15 : 0.25,
              wordBreak: "break-all",
              fontSize: dense ? { xs: '1.35rem', md: '1.6rem' } : undefined,
              lineHeight: dense ? 1.15 : undefined,
            }}
          >
            {header.value}
          </Typography>
        </Grid>

        <Grid item sx={{ position: "relative" }}>
          <Tooltip title={copied ? "Copied!" : "Click to copy"} placement="top">
            <IconButton onClick={copyToClipboard} size={dense ? "small" : "small"} sx={{ p: dense ? 0.5 : undefined }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            minWidth: 0,
          }}
        >
          <Tooltip title="View QR code" placement="top">
            <IconButton onClick={openQr} size="small" sx={{ p: dense ? 0.5 : undefined }}>
              <QrCodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Label sx={{ marginTop: 2 }} variant={header.label.variant}>
        {header.label.value}
      </Label>
      {header.actionText && (
        <>
          {header.actionText.url ? (
            <Link
              href={header.actionText.url}
              style={{ textDecoration: "none", marginLeft: "1rem" }}
            >
              <Typography variant="caption" color="primary.main">
                <LaunchIcon
                  color="primary"
                  sx={{
                    fontSize: "16px",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />{" "}
                {header.actionText.value}
              </Typography>
            </Link>
          ) : (
            <Typography variant="caption" color="primary.main" sx={{ ml: 1 }}>
              {header.actionText.value}
            </Typography>
          )}
        </>
      )}
    </Grid>
  );

  const withImage = !!entityImage;

  const computeMarginTopForFirstItem = (index: number) =>
    index === 0 ? { mt: 1.5 } : {};
  const computeColumnWidth = (itemsCount: number) =>
    itemsCount > 1
      ? {
          [withImage ? "md" : "lg"]: Number((12 / itemsCount).toFixed(2)),
        }
      : {};

  const layoutContent = items
    .map((item, idx) => {
      const nestedItems = Array.isArray(item) ? item : [item];

      const gridProps = {
        item: true,
        sx: computeMarginTopForFirstItem(idx),
        xs: 12,
        ...computeColumnWidth(nestedItems.length),
      };

      return nestedItems.map((nestedItem, nestedIdx) => (
        <Grid {...gridProps} key={`${idx}${nestedIdx}`}>
          {nestedItem}
        </Grid>
      ));
    })
    .flat();

  const innerLayout = (
    <Grid container spacing={1}>
      {layoutHeader}
      {layoutContent}
    </Grid>
  );

  if (withImage) {
    return (
      <>
        <Grid container spacing={8}>
          <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
            {innerLayout}
          </Grid>

          <Grid
            item
            order={{ xs: 1, lg: 2 }}
            xs={12}
            lg={4}
            xl={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {entityImage}
          </Grid>
        </Grid>

        <QrDialog
          open={isQrOpen}
          onClose={closeQr}
          value={header.clipBoardValue || ""}
          qrRef={qrRef}
        />
      </>
    );
  }

  return (
    <>
      {innerLayout}
      <QrDialog
        open={isQrOpen}
        onClose={closeQr}
        value={header.clipBoardValue || ""}
        qrRef={qrRef}
      />
    </>
  );
};

function QrDialog({
  open,
  onClose,
  value,
  qrRef,
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  qrRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="qr-dialog-title"
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background:
            "linear-gradient(180deg, rgba(12,12,12,0.92) 0%, rgba(10,10,10,0.78) 100%)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: { xs: "0.9rem", md: "1rem" },
          boxShadow:
            "0 18px 60px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          id="qr-dialog-title"
          sx={{
            fontSize: { xs: "0.75rem", md: "0.8125rem" },
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          QR Code
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            p: 0.75,
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            "&:hover": {
              color: "rgba(255,255,255,0.95)",
              borderColor: "rgba(255,255,255,0.18)",
              backgroundColor: "rgba(255,255,255,0.04)",
            },
          }}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "14px",
            p: 1.5,
            display: "grid",
            placeItems: "center",
            width: 260,
            height: 260,
            maxWidth: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            "& svg": {
              display: "block",
            },
          }}
        >
          <div ref={qrRef} />
        </Box>
        <Typography
          sx={{
            mt: 1.25,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.55)",
            wordBreak: "break-all",
            textAlign: "center",
            width: "100%",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Dialog>
  );
}
