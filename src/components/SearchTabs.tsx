'use client';

import { SearchMode } from '@/types/dictionary';

const TABS: { key: SearchMode; label: string }[] = [
  { key: 'dusun',   label: 'Dusun'   },
  { key: 'english', label: 'English' },
  { key: 'malay',   label: 'Malay'   },
  { key: 'sabahan', label: 'Sabahan' },
  { key: 'all',     label: 'All'     },
];

interface SearchTabsProps {
  active: SearchMode;
  onChange: (mode: SearchMode) => void;
}

export default function SearchTabs({ active, onChange }: SearchTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border',
            active === tab.key
              ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
