import ContractPage from "./ContractPage";

import { Metadata } from "next";
import { GradientBackground, DimGradientBackground, PageContainer } from "@/components/ui";
import { isEntityStubMode } from "@/config/stubMode";

export const metadata: Metadata = {
  title: "Contract info",
};

interface Props {
  params: {
    id: string;
  };
}

export default function ContractByIdPage({ params }: Props) {
  const forceEntityStub = isEntityStubMode();
  return (
    <GradientBackground sx={{ backgroundColor: "#000" }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <ContractPage params={params} forceEntityStub={forceEntityStub} />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}
