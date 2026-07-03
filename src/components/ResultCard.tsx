'use client';

import { BadgeCheck, BookMarked, Languages, SearchCheck, Volume2 } from 'lucide-react';
import { DictionaryEntry } from '@/types/dictionary';

interface ResultCardProps {
  entry: DictionaryEntry;
  onClick: (entry: DictionaryEntry) => void;
}

export default function ResultCard({ entry, onClick }: ResultCardProps) {
  return (
    <button
      onClick={() => onClick(entry)}
      className="group w-full border-b border-[#d8ccb8] px-2 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f3eadb] hover:shadow-[0_8px_18px_rgba(16,46,106,0.08)]"
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D4A017]/40 bg-[#FFF7E8] text-[#173D24] transition-colors group-hover:text-[#C89B2C]">
          <BookMarked size={17} strokeWidth={1.9} />
        </span>
        <span className="text-xl font-bold text-[#102E6A] group-hover:text-[#0d2555]">{entry.dusun}</span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#102E6A]/25 text-[#102E6A]">
          <Volume2 size={14} strokeWidth={1.9} />
        </span>
        {entry.part_of_speech && <span className="text-xs italic text-[#6f6f6f]">{entry.part_of_speech}</span>}
        {entry.alternative && (
          <span className="inline-flex items-center gap-1 text-xs italic text-[#7b7469]">
            <Languages size={14} strokeWidth={1.9} className="text-[#173D24]" />
            alt. {entry.alternative}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="inline-flex items-center text-[#2E5E3E]"><SearchCheck size={16} strokeWidth={1.9} /></span>
        {entry.english && <span className="text-[#1A1A1A]">{entry.english}</span>}
        {entry.english && (entry.malay || entry.sabahan) && <span className="text-[#7b7469]">|</span>}
        {entry.malay && <span className="text-[#2E5E3E]">{entry.malay}</span>}
        {entry.malay && entry.sabahan && <span className="text-[#7b7469]">|</span>}
        {entry.sabahan && <span className="text-[#2E5E3E]">{entry.sabahan}</span>}
      </div>

      {(entry.verified || entry.letter) && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          {entry.letter && <span className="rounded bg-[#e7dcc7] px-2 py-0.5 text-[#5c4738]">{entry.letter}</span>}
          {entry.verified && (
            <span className="inline-flex items-center gap-1 rounded border border-[#2E5E3E]/30 bg-[#edf4ef] px-2 py-0.5 text-[#2E5E3E]"><BadgeCheck size={14} strokeWidth={1.9} />Verified</span>
          )}
        </div>
      )}
    </button>
  );
}
