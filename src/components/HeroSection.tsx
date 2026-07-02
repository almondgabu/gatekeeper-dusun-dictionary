'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QUICK_ACTIONS = [
  {
    label: 'Dictionary',
    href: '/dictionary',
    description: 'Browse 8,000+ Dusun terms',
    primary: true,
  },
  {
    label: 'Common Phrases',
    href: '/common-phrases',
    description: 'Everyday useful expressions',
  },
  {
    label: 'Learn Dusun',
    href: '/product-roadmap#learning',
    description: 'Upcoming guided modules',
  },
  {
    label: 'Product Roadmap',
    href: '/product-roadmap',
    description: 'Future language tools',
  },
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
    <section className="relative overflow-hidden rounded-[34px] border border-[#D4A017]/45 text-[#FFF7E8] shadow-[0_30px_54px_rgba(16,46,106,0.18)]">
      {/* Place hero photography at public/images/home-hero.jpg */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[44%] bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(44,27,18,0.96) 0%, rgba(23,61,36,0.88) 56%, rgba(15,46,27,0.58) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-7 p-5 sm:p-7 lg:p-10">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-4xl leading-[0.98] sm:text-5xl lg:text-6xl">Gatekeeper Dusun Dictionary V1</h2>
          <p className="max-w-xl text-base leading-relaxed text-[#F4E5C7] sm:text-lg">
            Preserving the Language, Culture and
            <br />
            Heritage of Borneo.
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-[#E6C86D]">Owned &amp; Developed by</p>
          <p className="text-sm font-semibold tracking-[0.2em] text-[#FFF7E8] sm:text-base">BORNEO LAND GATEKEEPER</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl rounded-[20px] border border-[#E6C86D]/40 bg-[#FFF7E8] p-2.5 text-[#3A2417] shadow-[0_12px_30px_rgba(44,27,18,0.22)]"
        >
          <label className="sr-only" htmlFor="home-search">
            Search the dictionary
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#8A6837]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M15.8 14.4h-.7l-.3-.3a5.8 5.8 0 10-.7.7l.3.3v.7l4.6 4.5 1.4-1.4-4.6-4.5zm-5.3 0a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
              </span>
              <input
                id="home-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Dusun words or meanings"
                className="h-12 w-full rounded-2xl border border-[#DCC495] bg-[#FFFDF8] pr-4 pl-10 text-sm outline-none ring-[#D4A017] placeholder:text-[#8A735D] focus:ring-2 sm:h-14 sm:text-base"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              className="h-12 rounded-2xl border border-[#C7922B] bg-[#D4A017] px-6 text-sm font-semibold text-[#2C1B12] transition-colors hover:bg-[#E2B541] sm:h-14"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid gap-3 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={[
                'group flex min-h-[148px] flex-col rounded-2xl border p-4 transition-all',
                action.primary
                  ? 'border-[#D4A017] bg-[#173D24] text-[#FFF7E8] shadow-[0_10px_24px_rgba(15,46,27,0.32)]'
                  : 'border-[#D4A017]/65 bg-[#FFF7E8] text-[#3A2417] hover:-translate-y-0.5 hover:bg-[#FFF2D4]',
              ].join(' ')}
            >
              <span
                className={[
                  'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold',
                  action.primary
                    ? 'border-[#E6C86D] bg-[#0F2E1B] text-[#FFF7E8]'
                    : 'border-[#D4A017]/70 bg-[#FFFDF8] text-[#6A4A1F]',
                ].join(' ')}
              >
                {action.label[0]}
              </span>
              <p className="mt-3 text-base font-semibold leading-tight">{action.label}</p>
              <p className={action.primary ? 'mt-1 text-xs text-[#E0CCA1]' : 'mt-1 text-xs text-[#75583A]'}>{action.description}</p>
              <span className="mt-auto ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D4A017]/70 text-sm">
                &#8594;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
