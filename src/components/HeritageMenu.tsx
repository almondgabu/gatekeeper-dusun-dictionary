'use client';

import { BookOpen, ExternalLink, House, Info, Map, Menu, MessagesSquare, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const MENU_ITEMS = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Dictionary', href: '/dictionary', icon: BookOpen },
  { label: 'Common Phrases', href: '/common-phrases', icon: MessagesSquare },
  { label: 'Product Roadmap', href: '/product-roadmap', icon: Map },
  { label: 'About', href: '/about', icon: Info },
] as const satisfies Array<{ label: string; href: string; icon: LucideIcon }>;

export default function HeritageMenu() {
  return (
    <div className="relative">
      <button
        className="group inline-flex h-10 items-center gap-2 rounded-lg border border-[#D4AF37]/55 bg-[#2C1B12] px-3 text-sm font-medium text-[#F8F1E6] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b2418] hover:shadow-[0_10px_22px_rgba(16,46,106,0.22)]"
        aria-haspopup="menu"
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4 text-[#C89B2C] transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.9} />
        Menu
      </button>

      <div className="absolute right-0 top-12 z-30 w-64 rounded-xl border border-[#D4AF37]/45 bg-[#2C1B12] p-2 shadow-2xl">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-[#F8F1E6]/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b2418]"
          >
            <span className="flex items-center gap-2">
              <item.icon size={18} strokeWidth={1.9} className="text-[#F8F1E6] transition-colors group-hover:text-[#C89B2C]" />
              {item.label}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-[#D4AF37]/90">
              Open
              <ExternalLink size={13} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
