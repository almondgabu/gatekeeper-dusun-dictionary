'use client';

import { Copy, Star, Volume2 } from 'lucide-react';
import { CommonPhrase } from '@/types/common-phrases';

interface PhraseRowProps {
  phrase: CommonPhrase;
  onOpen: (phrase: CommonPhrase) => void;
  onCopy: (phrase: CommonPhrase) => void;
  onToggleFavourite: (phraseId: string) => void;
  isFavourite: boolean;
  isCopied: boolean;
}

export default function PhraseRow({ phrase, onOpen, onCopy, onToggleFavourite, isFavourite, isCopied }: PhraseRowProps) {
  const dusun = phrase.dusun_phrase ?? phrase.dusun ?? phrase.phrase ?? 'Untitled phrase';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(phrase)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(phrase);
        }
      }}
      className="group rounded-2xl border-b border-[#ddcfba] px-3 py-4 text-left transition-colors hover:bg-[#f5ebdd] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="break-words text-xl font-semibold text-[#102E6A] group-hover:text-[#0d2555]">{dusun}</p>
            {phrase.sort_order !== null && phrase.sort_order !== undefined && (
              <span className="rounded-full border border-[#d4bf9d] bg-[#f8f1e6] px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-[#7a5a2e]">
                #{phrase.sort_order}
              </span>
            )}
          </div>

          <div className="grid gap-2 text-sm text-[#2C1B12] sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#7f5f37]">English</p>
              <p className="mt-0.5">{phrase.english ?? '—'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#7f5f37]">Malay</p>
              <p className="mt-0.5 text-[#2E5E3E]">{phrase.malay ?? '—'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#7f5f37]">Sabahan</p>
              <p className="mt-0.5 text-[#2E5E3E]">{phrase.sabahan ?? '—'}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCopy(phrase);
            }}
            className={[
              'group inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5',
              isCopied
                ? 'border-[#2E5E3E]/45 bg-[#edf4ef] text-[#2E5E3E]'
                : 'border-[#d4bf9d] bg-[#fffaf0] text-[#4d3c2f] hover:bg-[#f3eadb] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]',
            ].join(' ')}
          >
            <Copy size={18} strokeWidth={1.9} className="text-[#173D24] transition-transform duration-300 group-hover:translate-x-0.5" />
            {isCopied ? 'Copied' : 'Copy'}
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavourite(phrase.id);
            }}
            className={[
              'group inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5',
              isFavourite
                ? 'border-[#D4AF37]/60 bg-[#D4AF37] text-[#2C1B12]'
                : 'border-[#d4bf9d] bg-[#fffaf0] text-[#4d3c2f] hover:bg-[#f3eadb] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]',
            ].join(' ')}
          >
            <Star size={18} strokeWidth={1.9} fill={isFavourite ? 'currentColor' : 'none'} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            {isFavourite ? 'Saved' : 'Favourite'}
          </button>

          <button
            type="button"
            disabled
            title="Audio coming soon"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d4bf9d] bg-[#fffaf0] px-3 text-sm font-medium text-[#8b7766] opacity-80"
          >
            <Volume2 size={18} strokeWidth={1.9} />
          </button>
        </div>
      </div>
    </div>
  );
}
