import UserPage from "./UserPage";

import { Metadata } from "next";
import { GradientBackground, DimGradientBackground, PageContainer } from "@/components/ui";

export const metadata: Metadata = {
  title: "User info",
};

interface Props {
  params: {
    id: string;
  };
}

export default function AccountByIdPage({ params }: Props) {
  return (
    <GradientBackground sx={{ backgroundColor: "#000" }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <UserPage params={params} />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}
