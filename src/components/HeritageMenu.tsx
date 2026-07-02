'use client';

import Link from 'next/link';

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Dictionary', href: '/dictionary' },
  { label: 'Common Phrases', href: '/common-phrases' },
  { label: 'Product Roadmap', href: '/product-roadmap' },
  { label: 'About', href: '/about' },
] as const;

export default function HeritageMenu() {
  return (
    <div className="relative">
      <button
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D4AF37]/55 bg-[#2C1B12] px-3 text-sm font-medium text-[#F8F1E6] transition-colors hover:bg-[#3b2418]"
        aria-haspopup="menu"
        aria-label="Open navigation"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      <div className="absolute right-0 top-12 z-30 w-64 rounded-xl border border-[#D4AF37]/45 bg-[#2C1B12] p-2 shadow-2xl">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-[#F8F1E6]/90 transition-colors hover:bg-[#3b2418]"
          >
            <span>{item.label}</span>
            <span className="text-[10px] uppercase tracking-wide text-[#D4AF37]/90">Open</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
