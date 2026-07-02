'use client';

import { useEffect } from 'react';
import { CommonPhrase } from '@/types/common-phrases';

interface PhraseDrawerProps {
  phrase: CommonPhrase | null;
  categoryName?: string;
  onClose: () => void;
}

interface FieldRowProps {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}

function FieldRow({ label, value, mono }: FieldRowProps) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-0.5 border-b border-[#e0d4bf] py-3 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#7a5a2e]">{label}</span>
      {mono ? (
        <span className="break-all font-mono text-sm text-[#4f3c2f]">{value}</span>
      ) : (
        <span className="text-sm leading-relaxed text-[#2C1B12]">{value}</span>
      )}
    </div>
  );
}

export default function PhraseDrawer({ phrase, categoryName, onClose }: PhraseDrawerProps) {
  useEffect(() => {
    if (!phrase) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, phrase]);

  useEffect(() => {
    if (phrase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [phrase]);

  if (!phrase) return null;

  const dusun = phrase.dusun_phrase ?? phrase.dusun ?? phrase.phrase ?? 'Untitled phrase';
  const source = phrase.source ?? (phrase.source_url ? 'DusunDictionary.com' : null);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/45 transition-opacity" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Common phrase: ${dusun}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-[#D4AF37]/45 bg-[#F8F1E6] shadow-2xl"
      >
        <div className="shrink-0 border-b border-[#D4AF37]/45 bg-[#2C1B12] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Common Phrase</p>
              <h2 className="text-2xl font-bold tracking-tight text-[#F8F1E6]">{dusun}</h2>
              {categoryName && <p className="mt-0.5 text-sm italic text-[#f0dfb5]">{categoryName}</p>}
            </div>

            <button
              onClick={onClose}
              className="rounded-md p-1 text-[#EEDBA8] transition-colors hover:bg-[#503224] hover:text-white"
              aria-label="Close drawer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          <div className="divide-y divide-slate-100">
            <FieldRow label="Dusun Phrase" value={dusun} />
            <FieldRow label="English" value={phrase.english} />
            <FieldRow label="Malay" value={phrase.malay} />
            <FieldRow label="Sabahan" value={phrase.sabahan} />
            <FieldRow label="Pronunciation" value={phrase.pronunciation} />
            <FieldRow label="Category" value={categoryName} />
            <FieldRow label="Source" value={source} />
            <FieldRow label="Source URL" value={phrase.source_url} mono />
          </div>

          <div className="mt-5 rounded-xl border border-[#D4AF37]/40 bg-[#efe4d0] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a2e]">AI Support</p>
            <p className="mt-1 text-sm text-[#2C1B12]">AI explanation coming soon</p>
          </div>

          <div className="mt-4 rounded-xl border border-[#d8c3a0] bg-[#fffaf0] p-4 text-sm text-[#4f3c2f]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a2e]">Audio</p>
            <p className="mt-1">Future audio playback placeholder</p>
          </div>

          {phrase.source_url && (
            <a
              href={phrase.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 mt-4 flex items-center gap-2 text-sm text-[#102E6A] hover:text-[#0d2555] hover:underline"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View source
            </a>
          )}
        </div>
      </div>
    </>
  );
}
