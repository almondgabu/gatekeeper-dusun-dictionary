'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const primaryItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'H' },
  { label: 'Dictionary', href: '/dictionary', icon: 'D' },
  { label: 'Common Phrases', href: '/common-phrases', icon: 'C' },
  { label: 'Learn Dusun', href: '/product-roadmap#learning', icon: 'L' },
  { label: 'Product Roadmap', href: '/product-roadmap', icon: 'P' },
  { label: 'About', href: '/about', icon: 'A' },
];

function SidebarLink({ label, href, active, icon }: { label: string; href: string; active: boolean; icon: string }) {
  return (
    <Link
      href={href}
      className={[
        'group flex items-center justify-between rounded-2xl border px-3.5 py-3 text-sm transition-all',
        active
          ? 'border-[#C7922B] bg-[#D4A017] text-[#2C1B12] shadow-[0_10px_20px_rgba(16,46,106,0.15)]'
          : 'border-[#E5D1A9] bg-[#FFF7E8] text-[#3A2417] hover:-translate-y-0.5 hover:border-[#D4A017] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]',
      ].join(' ')}
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            'inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold',
            active ? 'border-[#2C1B12]/30 bg-[#FFF7E8]/40' : 'border-[#D4A017]/45 bg-[#FFFDF8] text-[#5A3A1E]',
          ].join(' ')}
        >
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </span>
      <span className={active ? 'text-[#2C1B12]' : 'text-[#8A6837] transition-colors group-hover:text-[#5A3A1E]'}>&#8250;</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-full border-b border-[#E2CFA7] bg-[#F7EEDD] lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:border-b-0 lg:border-r">
      <div className="absolute inset-y-0 left-0 hidden w-[14px] bg-[repeating-linear-gradient(45deg,rgba(212,160,23,0.5)_0,rgba(212,160,23,0.5)_6px,transparent_6px,transparent_12px)] lg:block" aria-hidden="true" />

      <div className="flex h-full flex-col gap-6 p-4 sm:p-5 lg:overflow-y-auto lg:pl-7">
        <div className="rounded-[26px] border border-[#E2CFA7] bg-[#FFF7E8] p-4 text-center shadow-[0_14px_30px_rgba(16,46,106,0.1)]">
          {/* Place the official emblem at public/images/logo-gatekeeper-dusun.png */}
          <Image
            src="/images/logo-gatekeeper-dusun.png"
            alt="Gatekeeper Dusun emblem"
            width={150}
            height={150}
            className="mx-auto h-auto w-[150px] max-w-full"
            priority
          />
          <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-[#8A6837]">Heritage Edition</p>
        </div>

        <nav className="space-y-5">
          <section className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6837]">Navigation</p>
            <div className="space-y-2">
              {primaryItems.map((item) =>
                <SidebarLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  active={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                />
              )}
            </div>
          </section>
        </nav>

        <div className="mt-auto rounded-[20px] border border-[#D4A017]/45 bg-[#FFF7E8] p-4 text-sm text-[#3A2417] shadow-[0_10px_24px_rgba(16,46,106,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8A6837]">Version</p>
          <p className="mt-2 font-semibold text-[#2C1B12]">Gatekeeper Dusun Dictionary V1</p>
          <p className="text-sm text-[#6C5844]">Heritage Edition</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2C1B12]">BORNEO LAND GATEKEEPER</p>
        </div>
      </div>
    </aside>
  );
}
