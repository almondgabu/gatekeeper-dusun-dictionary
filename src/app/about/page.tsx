import { Cpu, Landmark, Target, Telescope, UserRound } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#1A1A1A] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar />

      <main className="relative overflow-hidden">
        <div className="heritage-side-strip left-0" aria-hidden="true" />
        <div className="heritage-side-strip right-0" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="rounded-[32px] border border-[#d8c4a4] bg-[linear-gradient(135deg,#2C1B12_0%,#3e281d_100%)] p-6 text-[#F8F1E6] shadow-[0_24px_60px_rgba(44,27,18,0.2)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#D4AF37]">About</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Gatekeeper Dusun Dictionary V1</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f1dfc0] sm:text-lg">
              A heritage language platform built to preserve, document and promote the Dusun language through a modern digital experience.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[28px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]"><Target size={17} strokeWidth={1.9} className="text-[#173D24]" />Mission</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2C1B12]">Preserve language access</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5e5144]">
                Make Dusun vocabulary and phrase knowledge easy to search, learn and share across generations.
              </p>
            </article>

            <article className="rounded-[28px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]"><Telescope size={17} strokeWidth={1.9} className="text-[#173D24]" />Vision</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2C1B12]">Lead digital preservation</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5e5144]">
                Become a trusted platform for Dusun learning, cultural continuity and future AI-assisted language tools.
              </p>
            </article>

            <article className="rounded-[28px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)] md:col-span-2">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]"><UserRound size={17} strokeWidth={1.9} className="text-[#173D24]" />Platform Architect</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2C1B12]">Almond Gabu</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5e5144]">
                The platform direction, structure and long-term vision were shaped around a practical digital home for the Dusun language.
              </p>
            </article>

            <article className="rounded-[28px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#7f5f37]"><Cpu size={17} strokeWidth={1.9} className="text-[#173D24]" />Technology</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2C1B12]">Built with modern web tools</h2>
              <ul className="mt-3 space-y-2 text-sm text-[#5e5144]">
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Supabase</li>
                <li>Responsive heritage UI</li>
              </ul>
            </article>

            <article className="rounded-[28px] border border-[#D4AF37]/40 bg-[#2C1B12] p-6 text-[#F8F1E6] shadow-[0_14px_40px_rgba(44,27,18,0.12)]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#D4AF37]"><Landmark size={17} strokeWidth={1.9} className="text-[#C89B2C]" />Owner</p>
              <h2 className="mt-2 text-2xl font-semibold">Gatekeeper Dusun Dictionary V1</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#f0dfc5]">Heritage Edition</p>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}