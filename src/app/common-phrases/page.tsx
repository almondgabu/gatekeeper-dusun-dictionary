import Sidebar from '@/components/Sidebar';
import CommonPhrasesApp from '@/components/CommonPhrasesApp';
import { createClient } from '@supabase/supabase-js';
import { CommonPhrase, CommonPhraseCategory } from '@/types/common-phrases';

export const dynamic = 'force-dynamic';

async function loadCommonPhrasesData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      categories: [] as CommonPhraseCategory[],
      phrases: [] as CommonPhrase[],
      error: 'Common phrases are unavailable because public Supabase credentials are missing.',
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const [categoriesResult, phrasesResult] = await Promise.all([
    supabase
      .from('common_phrase_categories')
      .select('id,name,slug,sort_order')
      .order('sort_order', { ascending: true }),
    supabase
      .from('common_phrases')
      .select('id,category_id,category_name,dusun_phrase,english,malay,sabahan,source_url,sort_order,verified,created_at,updated_at')
      .order('sort_order', { ascending: true }),
  ]);

  return {
    categories: (categoriesResult.data ?? []) as CommonPhraseCategory[],
    phrases: (phrasesResult.data ?? []) as CommonPhrase[],
    error: categoriesResult.error?.message ?? phrasesResult.error?.message ?? null,
  };
}

export default async function Page() {
  const { categories, phrases, error } = await loadCommonPhrasesData();

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#1A1A1A] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar />
      <main className="relative overflow-hidden">
        <CommonPhrasesApp initialCategories={categories} initialPhrases={phrases} initialError={error} />
      </main>
    </div>
  );
}
