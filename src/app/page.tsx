// Thin server-component page.
// force-dynamic prevents Next.js from prerendering at build time,
// which is required because the Supabase client uses runtime env vars.
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import StatisticsCards from '@/components/StatisticsCards';
import RoadmapPreview from '@/components/RoadmapPreview';

export default function Page() {
  return (
    <div className="home-layout min-h-screen text-[#3A2417] lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <Sidebar />

      <main className="relative overflow-hidden">
        <div className="heritage-border-bottom" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <HeroSection />
          <StatisticsCards />
          <RoadmapPreview />
        </div>
      </main>
    </div>
  );
}
