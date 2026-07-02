'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { DictionaryEntry, SearchMode } from '@/types/dictionary';
import AlphabetBar from '@/components/AlphabetBar';
import HeritageLogo from '@/components/HeritageLogo';
import HeritageMenu from '@/components/HeritageMenu';
import ResultCard from '@/components/ResultCard';
import WordDrawer from '@/components/WordDrawer';

const RESULT_LIMIT = 50;
const LETTER_RESULT_LIMIT = 200;
const DEBOUNCE_MS = 300;

type SearchPrecision = 'contains' | 'exact';
type SearchScope = 'words' | 'all';

interface DictionaryAppProps {
  initialQuery?: string;
}

async function queryDictionary(
  term: string,
  mode: SearchMode,
  precision: SearchPrecision,
  scope: SearchScope
): Promise<DictionaryEntry[]> {
  const t = term.trim();
  if (!t) return [];

  const pattern = precision === 'exact' ? t : `%${t}%`;
  let query = supabase
    .from('dictionary_entries')
    .select('*')
    .limit(RESULT_LIMIT)
    .order('dusun', { ascending: true });

  if (mode === 'all') {
    const fields =
      scope === 'words'
        ? ['dusun', 'alternative']
        : ['dusun', 'english', 'malay', 'sabahan', 'alternative', 'notes', 'example', 'dialect'];

    query = query.or(fields.map((field) => `${field}.ilike.${pattern}`).join(','));
  } else {
    query = query.ilike(mode, pattern);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DictionaryEntry[];
}

export default function DictionaryApp({ initialQuery = '' }: DictionaryAppProps) {
  const [query, setQuery]       = useState(initialQuery);
  const [mode, setMode]         = useState<SearchMode>('dusun');
  const [precision, setPrecision] = useState<SearchPrecision>('contains');
  const [scope, setScope] = useState<SearchScope>('words');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [results, setResults]   = useState<DictionaryEntry[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<DictionaryEntry | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (
    term: string,
    searchMode: SearchMode,
    searchPrecision: SearchPrecision,
    searchScope: SearchScope
  ) => {
    if (!term.trim()) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await queryDictionary(term, searchMode, searchPrecision, searchScope);
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const runLetterBrowse = useCallback(async (letter: string) => {
    setLoading(true);
    setError(null);
    try {
      const primary = await supabase
        .from('dictionary_entries')
        .select('*')
        .eq('letter', letter)
        .order('dusun', { ascending: true })
        .limit(LETTER_RESULT_LIMIT);

      if (primary.error) throw primary.error;

      let data = (primary.data ?? []) as DictionaryEntry[];

      if (data.length === 0) {
        const fallback = await supabase
          .from('dictionary_entries')
          .select('*')
          .ilike('dusun', `${letter}%`)
          .order('dusun', { ascending: true })
          .limit(LETTER_RESULT_LIMIT);

        if (fallback.error) throw fallback.error;
        data = (fallback.data ?? []) as DictionaryEntry[];
      }

      setResults(data);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Alphabet browsing failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLetterSelect = useCallback((letter: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSelectedLetter(letter);
    setMode('dusun');
    setPrecision('contains');
    setQuery('');
    setSearched(false);
    runLetterBrowse(letter);
  }, [runLetterBrowse]);

  const handleReset = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSelectedLetter(null);
    setQuery('');
    setMode('dusun');
    setResults([]);
    setError(null);
    setSearched(false);
    setLoading(false);
  }, []);

  const handleSearchSubmit = useCallback((event?: React.FormEvent) => {
    event?.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (selectedLetter) setSelectedLetter(null);
    runSearch(query, mode, precision, scope);
  }, [mode, precision, query, runSearch, scope, selectedLetter]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim() || selectedLetter) return;
    debounceRef.current = setTimeout(() => {
      runSearch(query, mode, precision, scope);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, mode, runSearch, selectedLetter, precision, scope]);

  const showEmpty = searched && !loading && results.length === 0;
  const showHint  = !query.trim() && !selectedLetter && !loading;
  const isSearchActive = !selectedLetter && query.trim().length > 0;
  const resultCountText = `${results.length} result${results.length !== 1 ? 's' : ''}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F1E6] text-[#1A1A1A]">
      <div className="heritage-side-strip left-0" aria-hidden="true" />
      <div className="heritage-side-strip right-0" aria-hidden="true" />

      <header className="relative z-10 border-b border-[#D4AF37]/40 bg-[#2C1B12] text-[#F8F1E6]">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-4 lg:grid-cols-[auto,1fr,auto] lg:items-center">
            <HeritageLogo />

            <form onSubmit={handleSearchSubmit} className="grid gap-3 rounded-xl border border-[#D4AF37]/35 bg-[#3a2419] p-3">
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    setQuery(nextValue);
                    if (nextValue.trim() && selectedLetter) setSelectedLetter(null);
                    if (!nextValue.trim()) {
                      setResults([]);
                      setSearched(false);
                      setLoading(false);
                    }
                  }}
                  placeholder="Search Dusun and translations"
                  className="w-full rounded-lg border border-[#D4AF37]/35 bg-[#F8F1E6] px-4 py-2.5 text-[#1A1A1A] outline-none ring-[#D4AF37] focus:ring-2"
                  autoComplete="off"
                  spellCheck={false}
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#7f6b53] border-t-[#2C1B12]" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={mode}
                  onChange={(e) => {
                    const nextMode = e.target.value as SearchMode;
                    setMode(nextMode);
                    if (nextMode !== 'dusun' && selectedLetter) setSelectedLetter(null);
                  }}
                  className="h-10 rounded-lg border border-[#D4AF37]/35 bg-[#F8F1E6] px-3 text-sm text-[#2C1B12] outline-none"
                >
                  <option value="dusun">Dusun</option>
                  <option value="english">English</option>
                  <option value="malay">Malay</option>
                  <option value="sabahan">Sabahan</option>
                  <option value="all">All languages</option>
                </select>

                <button
                  type="submit"
                  className="h-10 rounded-lg border border-[#D4AF37]/60 bg-[#D4AF37] px-4 text-sm font-semibold text-[#2C1B12] transition-colors hover:bg-[#e1c25f]"
                >
                  Search
                </button>

                <div className="inline-flex rounded-lg border border-[#D4AF37]/35 bg-[#F8F1E6] p-1">
                  <button
                    type="button"
                    onClick={() => setPrecision('exact')}
                    className={[
                      'rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
                      precision === 'exact' ? 'bg-[#102E6A] text-white' : 'text-[#4a3a2d]',
                    ].join(' ')}
                  >
                    Exact
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrecision('contains')}
                    className={[
                      'rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
                      precision === 'contains' ? 'bg-[#102E6A] text-white' : 'text-[#4a3a2d]',
                    ].join(' ')}
                  >
                    Contains
                  </button>
                </div>

                <div className="inline-flex rounded-lg border border-[#D4AF37]/35 bg-[#F8F1E6] p-1">
                  <button
                    type="button"
                    onClick={() => setScope('words')}
                    className={[
                      'rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
                      scope === 'words' ? 'bg-[#2E5E3E] text-white' : 'text-[#4a3a2d]',
                    ].join(' ')}
                  >
                    Words
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('all')}
                    className={[
                      'rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
                      scope === 'all' ? 'bg-[#2E5E3E] text-white' : 'text-[#4a3a2d]',
                    ].join(' ')}
                  >
                    All
                  </button>
                </div>
              </div>
            </form>

            <div className="justify-self-end">
              <HeritageMenu />
            </div>
          </div>

          <div className="mt-4">
            <AlphabetBar activeLetter={selectedLetter} onSelect={handleLetterSelect} onClear={handleReset} />
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/35 bg-[#102E6A] py-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#F8F1E6]">
          Gatekeeper Dusun Dictionary V1
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#d7c8ae] bg-[#F8F1E6] p-4 shadow-[0_8px_26px_rgba(44,27,18,0.08)] sm:p-6">
          {(selectedLetter || isSearchActive) && !loading && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#e2d6c3] pb-4">
              {selectedLetter ? (
                <div>
                  <h2 className="text-xl font-semibold text-[#2C1B12]">Words starting with &quot;{selectedLetter}&quot;</h2>
                  <p className="text-sm text-[#5f5548]">
                    {results.length === LETTER_RESULT_LIMIT ? `Showing first ${LETTER_RESULT_LIMIT} results` : resultCountText}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-[#2C1B12]">Search results for &quot;{query.trim()}&quot;</h2>
                  <p className="text-sm text-[#5f5548]">
                    {results.length === RESULT_LIMIT ? `Showing first ${RESULT_LIMIT} results` : resultCountText}
                  </p>
                </div>
              )}

              <button
                onClick={handleReset}
                className="rounded-md border border-[#2E5E3E]/35 bg-[#edf4ef] px-3 py-1.5 text-sm font-medium text-[#2E5E3E] hover:bg-[#dfeae1]"
              >
                Clear
              </button>
            </div>
          )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="rounded-xl border border-[#ddcfba] bg-[#fffaf0] px-3 py-1 sm:px-5">
            {results.map((entry) => (
              <ResultCard key={entry.id} entry={entry} onClick={setSelected} />
            ))}
          </div>
        )}

        {showEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-1 font-medium text-[#2C1B12]">No results found</p>
            <p className="max-w-xs text-sm text-[#6d6255]">
              Try another word or change search options to browse a wider set of entries.
            </p>
          </div>
        )}

        {showHint && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="mb-1 text-lg font-semibold text-[#2C1B12]">
              8,057 Dusun entries
            </h2>
            <p className="max-w-xs text-sm text-[#6d6255]">
              Explore by alphabet or search by language to study Dusun vocabulary and meanings.
            </p>
          </div>
        )}
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#D4AF37]/30 bg-[#2C1B12]">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-[#F8F1E6]/85 sm:px-6 lg:px-8">
          <p>Gatekeeper Dusun Dictionary V1 — Heritage dictionary and learning platform.</p>
          <p className="mt-1 text-[#D4AF37]">Built for Dusun language preservation.</p>
        </div>
      </footer>

      <WordDrawer entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
