import nextDynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';

export const dynamic = 'force-dynamic';

const DictionaryApp = nextDynamic(() => import('@/components/DictionaryApp'));

interface DictionaryPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ searchParams }: DictionaryPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#1A1A1A] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar />
      <main className="relative overflow-hidden">
        <DictionaryApp initialQuery={initialQuery} />
      </main>
    </div>
  );
}
