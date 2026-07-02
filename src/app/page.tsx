// Thin server-component page.
// force-dynamic prevents Next.js from prerendering at build time,
// which is required because the Supabase client uses runtime env vars.
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import StatisticsCards from '@/components/StatisticsCards';
import AboutSection from '@/components/AboutSection';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#1A1A1A] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar />

      <main className="relative overflow-hidden">
        <div className="heritage-side-strip left-0" aria-hidden="true" />
        <div className="heritage-side-strip right-0" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <HeroSection />
          <StatisticsCards />

          <section
            id="learn-dusun"
            className="rounded-[32px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]">Product Roadmap</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#2C1B12]">Planned learning modules</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5e5144]">
              The next learning experiences are being organized into a dedicated roadmap so users can follow the platform direction clearly.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {['Greetings', 'Family', 'Food', 'Numbers', 'Travel', 'Emergency', 'Shopping'].map((item) => (
                <Link key={item} href="/product-roadmap" className="rounded-2xl border border-dashed border-[#d8c3a0] bg-[#fffaf0] p-4 transition-colors hover:bg-[#fff3dc]">
                  <p className="text-sm font-semibold text-[#2C1B12]">{item}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#a07a2f]">See roadmap</p>
                </Link>
              ))}
            </div>
          </section>

          <AboutSection />

          <section className="rounded-[32px] border border-[#D4AF37]/35 bg-[#2C1B12] p-6 text-[#F8F1E6] shadow-[0_14px_40px_rgba(44,27,18,0.12)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#D4AF37]">Quick Links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dictionary"
                className="rounded-full border border-[#D4AF37]/60 bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#2C1B12] transition-colors hover:bg-[#e1c25f]"
              >
                Dictionary
              </Link>
              <Link
                href="/common-phrases"
                className="rounded-full border border-[#d4af37]/40 bg-[#3a2419] px-5 py-2.5 text-sm font-semibold text-[#F8F1E6] transition-colors hover:bg-[#4a3022]"
              >
                Common Phrases
              </Link>
              <Link
                href="/product-roadmap"
                className="rounded-full border border-[#d4af37]/40 bg-[#3a2419] px-5 py-2.5 text-sm font-semibold text-[#F8F1E6] transition-colors hover:bg-[#4a3022]"
              >
                Product Roadmap
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-[#d4af37]/40 bg-[#3a2419] px-5 py-2.5 text-sm font-semibold text-[#F8F1E6] transition-colors hover:bg-[#4a3022]"
              >
                About
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
