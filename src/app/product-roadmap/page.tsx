import { BookOpen, ChevronRight, ExternalLink, Info, Map, MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const roadmapGroups = [
  {
    title: 'Learning Modules',
    anchor: 'learning',
    items: ['Greetings', 'Family', 'Food', 'Numbers', 'Travel', 'Emergency', 'Shopping'],
  },
  {
    title: 'AI Experiences',
    anchor: 'ai',
    items: ['AI Translator', 'AI Language Teacher', 'Pronunciation Helper', 'Daily Word'],
  },
  {
    title: 'Personal Tools',
    anchor: 'tools',
    items: ['Favourite Words', 'Flash Cards', 'Quiz', 'Bookmarks', 'Recent History'],
  },
];

export default function ProductRoadmapPage() {
  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#1A1A1A] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar />

      <main className="relative overflow-hidden">
        <div className="heritage-side-strip left-0" aria-hidden="true" />
        <div className="heritage-side-strip right-0" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="rounded-[32px] border border-[#d8c4a4] bg-[linear-gradient(135deg,#2C1B12_0%,#3e281d_100%)] p-6 text-[#F8F1E6] shadow-[0_24px_60px_rgba(44,27,18,0.2)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#D4AF37]">Product Roadmap</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">What comes next</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f1dfc0] sm:text-lg">
              A focused roadmap for language learning features, AI support and personal study tools within Gatekeeper Dusun Dictionary V1.
            </p>
          </section>

          <section className="grid gap-4">
            {roadmapGroups.map((group) => (
              <article key={group.title} id={group.anchor} className="rounded-[28px] border border-[#d8c4a4] bg-[#f8f1e6] p-6 shadow-[0_14px_40px_rgba(44,27,18,0.08)]">
                <h2 className="text-2xl font-semibold text-[#2C1B12]">{group.title}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <div key={item} className="rounded-2xl border border-dashed border-[#d8c3a0] bg-[#fffaf0] p-4">
                      <p className="text-sm font-semibold text-[#2C1B12]">{item}</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#a07a2f]">Planned <ChevronRight size={13} strokeWidth={2} /></p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-[28px] border border-[#D4AF37]/40 bg-[#2C1B12] p-6 text-[#F8F1E6] shadow-[0_14px_40px_rgba(44,27,18,0.12)]">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#D4AF37]"><Map size={17} strokeWidth={1.9} className="text-[#C89B2C]" />Next Step</p>
            <h2 className="mt-2 text-2xl font-semibold">Continue exploring the platform</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/dictionary" className="group inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#2C1B12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(16,46,106,0.18)]">
                <BookOpen size={18} strokeWidth={1.9} />
                Dictionary
                <ExternalLink size={14} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/common-phrases" className="group inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#3a2419] px-5 py-2.5 text-sm font-semibold text-[#F8F1E6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(16,46,106,0.18)]">
                <MessagesSquare size={18} strokeWidth={1.9} className="text-[#C89B2C]" />
                Common Phrases
                <ExternalLink size={14} strokeWidth={1.9} className="text-[#C89B2C] transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/about" className="group inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#3a2419] px-5 py-2.5 text-sm font-semibold text-[#F8F1E6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(16,46,106,0.18)]">
                <Info size={18} strokeWidth={1.9} className="text-[#C89B2C]" />
                About
                <ExternalLink size={14} strokeWidth={1.9} className="text-[#C89B2C] transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}