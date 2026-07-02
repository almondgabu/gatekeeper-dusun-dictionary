type Statistic = {
  label: string;
  value: string;
  detail?: string;
};

const DEFAULT_STATS: Statistic[] = [
  { label: 'Dictionary Words', value: '8057', detail: 'Indexed Dusun entries' },
  { label: 'Phrase Categories', value: '22', detail: 'Heritage groupings' },
  { label: 'Common Phrases', value: '218', detail: 'Curated phrase records' },
];

export default function StatisticsCards({ stats = DEFAULT_STATS }: { stats?: Statistic[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#d8c3a0] bg-[#f8f1e6] p-4 shadow-[0_10px_28px_rgba(44,27,18,0.08)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f5f37]">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold text-[#2C1B12]">{stat.value}</p>
          {stat.detail && <p className="mt-1 text-sm text-[#665644]">{stat.detail}</p>}
        </div>
      ))}
    </div>
  );
}
