export interface CommonPhraseCategory {
  id: string;
  name: string;
  sort_order: number | null;
  slug?: string | null;
  description?: string | null;
}

export interface CommonPhrase {
  id: string;
  category_id: string;
  sort_order: number | null;
  dusun_phrase?: string | null;
  dusun?: string | null;
  phrase?: string | null;
  english?: string | null;
  malay?: string | null;
  sabahan?: string | null;
  pronunciation?: string | null;
  source?: string | null;
  source_url?: string | null;
  notes?: string | null;
}
