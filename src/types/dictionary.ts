export interface DictionaryEntry {
  id: string;
  letter: string;
  dusun: string;
  english: string | null;
  malay: string | null;
  sabahan: string | null;
  part_of_speech: string | null;
  alternative: string | null;
  notes: string | null;
  example: string | null;
  pronunciation: string | null;
  dialect: string | null;
  source: string | null;
  source_url: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export type SearchMode = 'dusun' | 'english' | 'malay' | 'sabahan' | 'all';
