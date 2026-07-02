import Link from 'next/link';

const ROADMAP_ITEMS = [
  'Grammar Guide',
  'Interactive Lessons',
  'Pronunciation Audio',
  'AI Translation Assistant',
  'Community Contributions',
];

export default function RoadmapPreview() {
  return (
    <section className="rounded-[30px] border border-[#D4A017]/45 bg-[#FFF7E8] p-5 shadow-[0_14px_34px_rgba(16,46,106,0.1)] sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_270px] lg:items-center">
        <div
          className="h-40 rounded-2xl border border-[#D4A017]/30 bg-[#FFFDF8]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(60deg, rgba(23,61,36,0.08) 0, rgba(23,61,36,0.08) 2px, transparent 2px, transparent 14px), repeating-linear-gradient(-60deg, rgba(212,160,23,0.16) 0, rgba(212,160,23,0.16) 1px, transparent 1px, transparent 16px)',
          }}
          aria-hidden="true"
        />

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A6837]">Product Roadmap</p>
          <h3 className="mt-2 text-3xl leading-tight text-[#2C1B12]">Planned learning modules</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5F4A38] sm:text-base">
            We are continuously building new tools and resources
            <br />
            to help preserve and promote the Dusun language.
          </p>
          <Link
            href="/product-roadmap"
            className="mt-5 inline-flex items-center rounded-full border border-[#C7922B] bg-[#D4A017] px-5 py-2.5 text-sm font-semibold text-[#2C1B12] transition-colors hover:bg-[#E2B541]"
          >
            View Roadmap
          </Link>
        </div>

        <ul className="space-y-2.5 rounded-2xl border border-[#D4A017]/35 bg-[#FFFDF8] p-4">
          {ROADMAP_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-[#3A2417]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#173D24]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
