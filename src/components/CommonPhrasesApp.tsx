'use client';

import { ArrowLeft, FolderOpen, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CommonPhrase, CommonPhraseCategory } from '@/types/common-phrases';
import PhraseCategoryBar from '@/components/PhraseCategoryBar';
import PhraseRow from '@/components/PhraseRow';
import PhraseDrawer from '@/components/PhraseDrawer';

function getPhraseText(phrase: CommonPhrase) {
  return phrase.dusun_phrase ?? phrase.dusun ?? phrase.phrase ?? '';
}

function normalizeText(value: string | null | undefined) {
  return (value ?? '').trim().toLowerCase();
}

interface CommonPhrasesAppProps {
  initialCategories: CommonPhraseCategory[];
  initialPhrases: CommonPhrase[];
  initialError?: string | null;
}

export default function CommonPhrasesApp({
  initialCategories,
  initialPhrases,
  initialError = null,
}: CommonPhrasesAppProps) {
  const [categories] = useState<CommonPhraseCategory[]>(initialCategories);
  const [phrases] = useState<CommonPhrase[]>(initialPhrases);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialCategories[0]?.id ?? null
  );
  const [query, setQuery] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState<CommonPhrase | null>(null);
  const [copiedPhraseId, setCopiedPhraseId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId]
  );

  const filteredPhrases = useMemo(() => {
    const searchTerm = normalizeText(query);

    return phrases.filter((phrase) => {
      if (selectedCategoryId && phrase.category_id !== selectedCategoryId) return false;

      if (!searchTerm) return true;

      return [getPhraseText(phrase), phrase.english, phrase.malay, phrase.sabahan].some((value) =>
        normalizeText(value).includes(searchTerm)
      );
    });
  }, [phrases, query, selectedCategoryId]);

  const handleCopy = async (phrase: CommonPhrase) => {
    const text = getPhraseText(phrase);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhraseId(phrase.id);
      window.setTimeout(() => {
        setCopiedPhraseId((current) => (current === phrase.id ? null : current));
      }, 1600);
    } catch {
      setCopiedPhraseId(null);
    }
  };

  const handleToggleFavourite = (phraseId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(phraseId)) {
        next.delete(phraseId);
      } else {
        next.add(phraseId);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F1E6] text-[#1A1A1A]">
      <div className="heritage-side-strip left-0" aria-hidden="true" />
      <div className="heritage-side-strip right-0" aria-hidden="true" />

      <div className="border-b border-[#D4AF37]/35 bg-[#2C1B12] text-[#F8F1E6]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Common Phrases</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Heritage phrase archive</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#f1dfc0] sm:text-base">
            Explore curated Dusun phrases with English, Malay, and Sabahan references. Search updates instantly without refreshing the page.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#3a2419] px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Categories</p>
              <p className="mt-1 text-2xl font-semibold text-[#F8F1E6]">{categories.length}</p>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#3a2419] px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Common Phrases</p>
              <p className="mt-1 text-2xl font-semibold text-[#F8F1E6]">{phrases.length}</p>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#3a2419] px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Owner</p>
              <p className="mt-1 text-lg font-semibold text-[#F8F1E6]">Gatekeeper Dusun Dictionary V1</p>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#d7c8ae] bg-[#F8F1E6] p-4 shadow-[0_8px_26px_rgba(44,27,18,0.08)] sm:p-6">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#2C1B12]"><FolderOpen size={22} strokeWidth={1.9} className="text-[#173D24]" />Category navigation</h2>
              <p className="text-sm text-[#5f5548]">Select a category to filter the phrase list.</p>
            </div>

            <label className="w-full max-w-md">
              <span className="sr-only">Search common phrases</span>
              <span className="relative block">
                <Search size={18} strokeWidth={1.9} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8A6837]" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Dusun, English, or Malay"
                  className="h-12 w-full rounded-xl border border-[#d5c4a8] bg-[#fffaf0] pr-4 pl-10 text-sm text-[#2C1B12] outline-none ring-[#D4AF37] focus:ring-2"
                  autoComplete="off"
                  spellCheck={false}
                />
              </span>
            </label>
          </div>

          {initialError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {initialError}
            </div>
          )}

          {categories.length === 0 && phrases.length === 0 ? (
            <div className="rounded-2xl border border-[#d5c4a8] bg-[#fffaf0] px-4 py-8 text-center text-sm text-[#6d6255]">
              No common phrase data is available in the current Supabase environment yet.
            </div>
          ) : categories.length > 0 ? (
            <PhraseCategoryBar
              categories={categories}
              activeCategoryId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d5c4a8] bg-[#fffaf0] px-4 py-8 text-center text-sm text-[#6d6255]">
              No categories available.
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[#d7c8ae] bg-[#F8F1E6] p-4 shadow-[0_8px_26px_rgba(44,27,18,0.08)] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#e2d6c3] pb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#2C1B12]">{selectedCategory ? selectedCategory.name : 'All phrases'}</h2>
              <p className="text-sm text-[#5f5548]">
                {filteredPhrases.length} phrase{filteredPhrases.length === 1 ? '' : 's'} shown
              </p>
            </div>

            {query.trim() && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="group inline-flex items-center gap-2 rounded-md border border-[#2E5E3E]/35 bg-[#edf4ef] px-3 py-1.5 text-sm font-medium text-[#2E5E3E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dfeae1] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]"
              >
                <ArrowLeft size={16} strokeWidth={1.9} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                Clear search
              </button>
            )}
          </div>

          {filteredPhrases.length > 0 ? (
            <div className="rounded-xl border border-[#ddcfba] bg-[#fffaf0] px-2">
              {filteredPhrases.map((phrase) => (
                <PhraseRow
                  key={phrase.id}
                  phrase={phrase}
                  onOpen={setSelectedPhrase}
                  onCopy={handleCopy}
                  onToggleFavourite={handleToggleFavourite}
                  isFavourite={favoriteIds.has(phrase.id)}
                  isCopied={copiedPhraseId === phrase.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#d5c4a8] bg-[#fffaf0] py-20 text-center">
              <p className="mb-1 font-medium text-[#2C1B12]">No phrases found</p>
              <p className="max-w-xs text-sm text-[#6d6255]">
                Try a different category or search term to locate another heritage phrase.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#D4AF37]/30 bg-[#2C1B12]">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-[#F8F1E6]/85 sm:px-6 lg:px-8">
          <p>Common Phrases — Heritage phrase archive within Gatekeeper Dusun Dictionary V1.</p>
          <p className="mt-1 text-[#D4AF37]">Built for Dusun language preservation.</p>
        </div>
      </footer>

      <PhraseDrawer
        phrase={selectedPhrase}
        categoryName={selectedCategory?.name}
        onClose={() => setSelectedPhrase(null)}
      />
    </div>
  );
}
