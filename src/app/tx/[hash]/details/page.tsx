import { Metadata } from "next";
import { redirect } from "next/navigation";

interface RawTransactionWithDetailsProps {
  params: {
    hash: string;
  };
}

export const metadata: Metadata = {
  title: "Raw tx details",
};

export default async function RawTransactionWithDetailsPage({
  params,
}: RawTransactionWithDetailsProps) {
  const id = decodeURIComponent(params.hash);
  redirect(`/tx/${encodeURIComponent(id)}?tab=raw`);
}
