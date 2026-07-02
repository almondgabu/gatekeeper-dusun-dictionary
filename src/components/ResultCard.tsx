'use client';

import { DictionaryEntry } from '@/types/dictionary';

interface ResultCardProps {
  entry: DictionaryEntry;
  onClick: (entry: DictionaryEntry) => void;
}

export default function ResultCard({ entry, onClick }: ResultCardProps) {
  return (
    <button
      onClick={() => onClick(entry)}
      className="group w-full border-b border-[#d8ccb8] px-2 py-4 text-left transition-colors hover:bg-[#f3eadb]"
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="text-xl font-bold text-[#102E6A] group-hover:text-[#0d2555]">{entry.dusun}</span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#102E6A]/25 text-[#102E6A]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H3v6h3l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 8.5a5 5 0 010 7" strokeLinecap="round" />
          </svg>
        </span>
        {entry.part_of_speech && <span className="text-xs italic text-[#6f6f6f]">{entry.part_of_speech}</span>}
        {entry.alternative && <span className="text-xs italic text-[#7b7469]">alt. {entry.alternative}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-[#2C1B12]">➤</span>
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
            <span className="rounded border border-[#2E5E3E]/30 bg-[#edf4ef] px-2 py-0.5 text-[#2E5E3E]">Verified</span>
          )}
        </div>
      )}
    </button>
  );
}
