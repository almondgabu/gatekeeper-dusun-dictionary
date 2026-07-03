'use client';

import { ArrowLeft, BadgeCheck, BookMarked, ExternalLink, Languages, Volume2, type LucideIcon } from 'lucide-react';
import { useEffect } from 'react';
import { DictionaryEntry } from '@/types/dictionary';

interface WordDrawerProps {
  entry: DictionaryEntry | null;
  onClose: () => void;
}

interface FieldRowProps {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
  icon?: LucideIcon;
}

function FieldRow({ label, value, mono, icon: Icon }: FieldRowProps) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 border-b border-[#e0d4bf] py-3 last:border-0">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a5a2e]">
        {Icon ? <Icon size={15} strokeWidth={1.9} /> : null}
        {label}
      </span>
      {mono ? (
        <span className="break-all font-mono text-sm text-[#4f3c2f]">{value}</span>
      ) : (
        <span className="text-sm leading-relaxed text-[#2C1B12]">{value}</span>
      )}
    </div>
  );
}

export default function WordDrawer({ entry, onClose }: WordDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    if (!entry) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [entry, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (entry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [entry]);

  if (!entry) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/45 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Dictionary entry: ${entry.dusun}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-[#D4AF37]/45 bg-[#F8F1E6] shadow-2xl"
      >
        <div className="shrink-0 border-b border-[#D4AF37]/45 bg-[#2C1B12] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Dusun Entry</p>
              <h2 className="text-2xl font-bold tracking-tight text-[#F8F1E6]">{entry.dusun}</h2>
              {entry.part_of_speech && (
                <p className="mt-0.5 text-sm italic text-[#f0dfb5]">{entry.part_of_speech}</p>
              )}
            </div>
            <div className="mt-1 flex shrink-0 items-center gap-2">
              {entry.verified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#2E5E3E]/50 bg-[#2E5E3E]/20 px-2 py-0.5 text-xs font-medium text-[#daf0df]">
                  <BadgeCheck size={14} strokeWidth={1.9} />
                  Verified
                </span>
              )}
              <button
                onClick={onClose}
                className="inline-flex items-center rounded-md p-1 text-[#EEDBA8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#503224] hover:text-white"
                aria-label="Close drawer"
              >
                <ArrowLeft size={20} strokeWidth={1.9} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          <div className="divide-y divide-slate-100">
            <FieldRow label="Word Details"  value={entry.dusun}         icon={BookMarked} />
            <FieldRow label="English"       value={entry.english}       />
            <FieldRow label="Malay"         value={entry.malay}         />
            <FieldRow label="Sabahan"       value={entry.sabahan}       />
            <FieldRow label="Part of Speech" value={entry.part_of_speech} />
            <FieldRow label="Alternative"   value={entry.alternative}   icon={Languages} />
            <FieldRow label="Pronunciation" value={entry.pronunciation} icon={Volume2} />
            <FieldRow label="Dialect"       value={entry.dialect}       />
            <FieldRow label="Notes"         value={entry.notes}         />
            <FieldRow label="Example"       value={entry.example}       />
            <FieldRow label="Source"        value={entry.source}        />
            <FieldRow label="Source URL"    value={entry.source_url} mono />
          </div>

          <div className="mt-5 rounded-xl border border-[#D4AF37]/40 bg-[#efe4d0] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a2e]">AI Support</p>
            <p className="mt-1 text-sm text-[#2C1B12]">AI explanation coming soon</p>
          </div>

          {entry.source_url && (
            <a
              href={entry.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-6 mt-4 flex items-center gap-2 text-sm text-[#102E6A] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0d2555] hover:underline"
            >
              <ExternalLink size={17} strokeWidth={1.9} className="w-4 shrink-0 text-[#C89B2C] transition-transform duration-300 group-hover:translate-x-0.5" />
              View on source site
            </a>
          )}
        </div>
      </div>
    </>
  );
}
