import { ArrowLeft } from 'lucide-react';

const LETTERS = ['A', 'B', 'D', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'] as const;

interface AlphabetBarProps {
  activeLetter: string | null;
  onSelect: (letter: string) => void;
  onClear: () => void;
}

export default function AlphabetBar({ activeLetter, onSelect, onClear }: AlphabetBarProps) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/35 bg-[#F2E8D9] p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            onClick={() => onSelect(letter)}
            className={[
              'min-w-9 rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
              activeLetter === letter
                ? 'border-[#B8322A] bg-[#B8322A] text-white shadow-sm'
                : 'border-[#d5c4a8] bg-[#f8f1e6] text-[#2C1B12] hover:bg-[#e8dbc4]',
            ].join(' ')}
            aria-pressed={activeLetter === letter}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={onClear}
          className="group ml-auto inline-flex items-center gap-2 rounded-md border border-[#2E5E3E]/45 bg-[#edf3ee] px-3 py-1.5 text-sm font-medium text-[#2E5E3E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dfeae1] hover:shadow-[0_8px_18px_rgba(16,46,106,0.12)]"
        >
          <ArrowLeft size={16} strokeWidth={1.9} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
