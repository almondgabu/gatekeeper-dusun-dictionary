'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QUICK_ACTIONS = [
  { label: 'Dictionary', href: '/dictionary', primary: true },
  { label: 'Common Phrases', href: '/common-phrases' },
  { label: 'Learn Dusun', href: '/product-roadmap#learning' },
  { label: 'About', href: '/about' },
];

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();
    if (!value) return;
    router.push(`/dictionary?q=${encodeURIComponent(value)}`);
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-[#d8c4a4] bg-[linear-gradient(135deg,#2C1B12_0%,#3e281d_45%,#102E6A_100%)] text-[#F8F1E6] shadow-[0_24px_60px_rgba(44,27,18,0.2)]">
      <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.15fr),minmax(0,0.85fr)] xl:items-center xl:p-10">
        <div className="space-y-5">
          <div className="space-y-3">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
              Gatekeeper Dusun Dictionary V1
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#f1dfc0] sm:text-xl">
              Preserving the Language, Culture and Heritage of Borneo.
            </p>
            <p className="text-sm uppercase tracking-[0.22em] text-[#D4AF37]">Owned &amp; Developed by</p>
            <p className="text-base font-semibold tracking-[0.16em] text-[#F8F1E6]">BORNEO LAND GATEKEEPER</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl rounded-3xl border border-[#d4af37]/35 bg-[#f8f1e6] p-3 text-[#2C1B12] shadow-[0_14px_35px_rgba(44,27,18,0.18)]"
          >
            <label className="sr-only" htmlFor="home-search">
              Search the dictionary
            </label>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                id="home-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Dusun words or meanings"
                className="h-14 min-w-0 flex-1 rounded-2xl border border-[#d9c4a0] bg-[#fffaf0] px-4 text-base outline-none ring-[#D4AF37] focus:ring-2"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="h-14 rounded-2xl border border-[#D4AF37]/70 bg-[#D4AF37] px-6 text-sm font-semibold text-[#2C1B12] transition-colors hover:bg-[#e1c25f]"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-3 rounded-[28px] border border-[#d4af37]/30 bg-[#f8f1e6]/10 p-4 backdrop-blur-sm sm:grid-cols-2 xl:p-5">
          {QUICK_ACTIONS.map((action) =>
            <Link
              key={action.label}
              href={action.href}
              className={[
                'rounded-2xl border p-4 transition-transform hover:-translate-y-0.5',
                action.primary
                  ? 'border-[#D4AF37]/60 bg-[#D4AF37] text-[#2C1B12]'
                  : 'border-[#d4af37]/35 bg-[#2C1B12]/45 text-[#F8F1E6]',
              ].join(' ')}
            >
              <p className="text-sm font-semibold">{action.label}</p>
              <p className={action.primary ? 'mt-1 text-xs text-[#5e4518]' : 'mt-1 text-xs text-[#d9c69a]'}>
                Open section
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
