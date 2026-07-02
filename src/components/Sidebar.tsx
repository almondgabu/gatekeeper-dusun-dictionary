'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href?: string;
  comingSoon?: boolean;
};

const primaryItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Dictionary', href: '/dictionary' },
  { label: 'Common Phrases', href: '/common-phrases' },
  { label: 'Learn Dusun', href: '/product-roadmap#learning' },
  { label: 'Product Roadmap', href: '/product-roadmap' },
  { label: 'About', href: '/about' },
];

function SidebarLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors',
        active
          ? 'border-[#D4AF37]/60 bg-[#F6E7C5] text-[#2C1B12] shadow-sm'
          : 'border-[#e2d3bc] bg-[#faf3e7] text-[#4a392b] hover:border-[#cdb890] hover:bg-[#f3eadb]',
      ].join(' ')}
    >
      <span className="font-medium">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#7d6248]">Open</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-[#d9c6a8] bg-[#efe2c8] lg:sticky lg:top-0 lg:h-screen lg:w-[320px] lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col gap-6 p-4 sm:p-6 lg:overflow-y-auto">
        <div className="rounded-[28px] border border-[#d7c097] bg-[#2C1B12] p-5 text-[#F8F1E6] shadow-[0_24px_50px_rgba(44,27,18,0.18)]">
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Gatekeeper Dusun Dictionary V1</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-[#F8F1E6]">Heritage navigation</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#f1dfc0]/90">Official portal for the Dusun dictionary and common phrases archive.</p>
        </div>

        <nav className="space-y-5">
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7f5f37]">Navigate</p>
            <div className="space-y-2">
              {primaryItems.map((item) =>
                item.href ? (
                  <SidebarLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  />
                ) : null
              )}
            </div>
          </section>
        </nav>

          <div className="mt-auto rounded-[22px] border border-[#d4bf9d] bg-[#f7efe1] p-4 text-sm text-[#4d3a2b]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#7f5f37]">Version</p>
            <p className="mt-2 font-medium text-[#2C1B12]">Gatekeeper Dusun Dictionary V1</p>
            <p className="text-sm text-[#6a5b4c]">Heritage Edition</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2C1B12]">BORNEO LAND GATEKEEPER</p>
          </div>
      </div>
    </aside>
  );
}
