import { BookText, FolderTree, MessageCircleQuestion, type LucideIcon } from 'lucide-react';

type Statistic = {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
};

const DEFAULT_STATS: Statistic[] = [
  { label: 'Dictionary Words', value: '8,057', detail: 'Indexed Dusun entries', icon: BookText },
  { label: 'Phrase Categories', value: '22', detail: 'Heritage groupings', icon: FolderTree },
  { label: 'Common Phrases', value: '218', detail: 'Curated phrase records', icon: MessageCircleQuestion },
];

export default function StatisticsCards({ stats = DEFAULT_STATS }: { stats?: Statistic[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-[22px] border border-[#D4A017]/45 bg-[#FFF7E8] p-5 shadow-[0_12px_28px_rgba(16,46,106,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(16,46,106,0.16)]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A017]/50 bg-[#FFFDF8] text-[#173D24] transition-transform duration-300 group-hover:scale-105">
            <stat.icon size={19} strokeWidth={1.9} />
          </span>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A6837]">{stat.label}</p>
          <p className="mt-2 text-4xl font-semibold leading-none text-[#173D24]">{stat.value}</p>
          <div className="mt-3 h-[2px] w-14 rounded-full bg-[#D4A017]/75" aria-hidden="true" />
          {stat.detail && <p className="mt-2 text-sm text-[#6C5844]">{stat.detail}</p>}
        </div>
      ))}
    </section>
  );
}
