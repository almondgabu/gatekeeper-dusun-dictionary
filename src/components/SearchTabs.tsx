'use client';

import { BookOpen, Languages, SearchCheck, type LucideIcon } from 'lucide-react';
import { SearchMode } from '@/types/dictionary';

const TABS: { key: SearchMode; label: string; icon: LucideIcon }[] = [
  { key: 'dusun',   label: 'Dusun', icon: BookOpen },
  { key: 'english', label: 'English', icon: Languages },
  { key: 'malay',   label: 'Malay', icon: Languages },
  { key: 'sabahan', label: 'Sabahan', icon: Languages },
  { key: 'all',     label: 'All', icon: SearchCheck },
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
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border hover:-translate-y-0.5',
            active === tab.key
              ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800 hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]',
          ].join(' ')}
        >
          <tab.icon size={16} strokeWidth={1.9} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
