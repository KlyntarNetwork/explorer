import { DimGradientBackground, GradientBackground, PageContainer, EntityPageSkeleton } from '@/components/ui';

export default function Loading() {
  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <EntityPageSkeleton title="Pool ID" blocks={10} showTable />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}


