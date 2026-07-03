import { FolderOpen } from 'lucide-react';
import { CommonPhraseCategory } from '@/types/common-phrases';

interface PhraseCategoryBarProps {
  categories: CommonPhraseCategory[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string) => void;
}

export default function PhraseCategoryBar({ categories, activeCategoryId, onSelect }: PhraseCategoryBarProps) {
  return (
    <div className="rounded-[28px] border border-[#d8c4a4] bg-[#f3e8d4] p-4 shadow-[0_10px_28px_rgba(44,27,18,0.08)]">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const active = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={[
                'group shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                active
                  ? 'border-[#D4AF37]/70 bg-[#2C1B12] text-[#F8F1E6]'
                  : 'border-[#d6c4a6] bg-[#fffaf0] text-[#4d3c2f] hover:border-[#c5b08b] hover:bg-[#f6eddc] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]',
              ].join(' ')}
            >
              <span className="flex items-center gap-2">
                <FolderOpen size={18} strokeWidth={1.9} className={active ? 'text-[#C89B2C]' : 'text-[#173D24] transition-colors group-hover:text-[#C89B2C]'} />
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
