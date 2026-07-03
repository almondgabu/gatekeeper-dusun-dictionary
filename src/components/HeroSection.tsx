'use client';

import { ArrowRight, BookOpen, GraduationCap, Image as ImageIcon, Map, MessagesSquare, Search, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_HERO_BACKGROUND, HERO_BACKGROUNDS } from '@/lib/hero-backgrounds';

const HERO_BG_STORAGE_KEY = 'gdd.hero-background-id';
const FALLBACK_HERO_ID = 'traditional-house';

type QuickAction = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  primary?: boolean;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Dictionary',
    href: '/dictionary',
    description: 'Browse 8,000+ Dusun terms',
    primary: true,
    icon: BookOpen,
  },
  {
    label: 'Common Phrases',
    href: '/common-phrases',
    description: 'Everyday useful expressions',
    icon: MessagesSquare,
  },
  {
    label: 'Learn Dusun',
    href: '/product-roadmap#learning',
    description: 'Upcoming guided modules',
    icon: GraduationCap,
  },
  {
    label: 'Product Roadmap',
    href: '/product-roadmap',
    description: 'Future language tools',
    icon: Map,
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(FALLBACK_HERO_ID);
  const [previousBackground, setPreviousBackground] = useState<string | null>(null);
  const [previousBackgroundVisible, setPreviousBackgroundVisible] = useState(false);
  const preloadedBackgrounds = useRef(new Set<string>([DEFAULT_HERO_BACKGROUND]));
  const transitionTimeoutRef = useRef<number | null>(null);
  const skipInitialPersistRef = useRef(true);

  const selectedBackground = useMemo(
    () => HERO_BACKGROUNDS.find((background) => background.id === selectedId) ?? HERO_BACKGROUNDS[0],
    [selectedId]
  );

  useEffect(() => {
    const savedBackgroundId = window.localStorage.getItem(HERO_BG_STORAGE_KEY);
    const savedBackground = HERO_BACKGROUNDS.find((background) => background.id === savedBackgroundId);

    if (savedBackground) {
      const restoreTimeout = window.setTimeout(() => {
        setSelectedId((current) => (current === savedBackground.id ? current : savedBackground.id));
      }, 0);

      return () => {
        window.clearTimeout(restoreTimeout);
      };
    }
  }, []);

  useEffect(() => {
    if (skipInitialPersistRef.current) {
      skipInitialPersistRef.current = false;
      return;
    }

    window.localStorage.setItem(HERO_BG_STORAGE_KEY, selectedBackground.id);

    if (!preloadedBackgrounds.current.has(selectedBackground.image)) {
      const preloadImage = new window.Image();
      preloadImage.src = selectedBackground.image;
      preloadedBackgrounds.current.add(selectedBackground.image);
    }
  }, [selectedBackground.id, selectedBackground.image]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const handleBackgroundChange = (nextId: string) => {
    if (nextId === selectedId) {
      return;
    }

    const nextBackground = HERO_BACKGROUNDS.find((background) => background.id === nextId);
    if (!nextBackground) {
      return;
    }

    if (!preloadedBackgrounds.current.has(nextBackground.image)) {
      const preloadImage = new window.Image();
      preloadImage.src = nextBackground.image;
      preloadedBackgrounds.current.add(nextBackground.image);
    }

    setPreviousBackground(selectedBackground.image);
    setPreviousBackgroundVisible(true);
    setSelectedId(nextId);

    window.requestAnimationFrame(() => {
      setPreviousBackgroundVisible(false);
    });

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousBackground(null);
    }, 320);
  };

  useEffect(() => {
    const preloadAlternatives = () => {
      HERO_BACKGROUNDS.forEach((background) => {
        if (background.image === DEFAULT_HERO_BACKGROUND || preloadedBackgrounds.current.has(background.image)) {
          return;
        }

        const imageElement = new window.Image();
        imageElement.src = background.image;
        preloadedBackgrounds.current.add(background.image);
      });
    };

    const idleCallbackId = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => preloadAlternatives(), { timeout: 2500 })
      : null;

    const timeoutId = idleCallbackId === null
      ? window.setTimeout(() => preloadAlternatives(), 1200)
      : null;

    return () => {
      if (idleCallbackId !== null) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();
    if (!value) return;
    router.push(`/dictionary?q=${encodeURIComponent(value)}`);
  };

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[#D4A017]/45 text-[#FFF7E8] shadow-[0_30px_54px_rgba(16,46,106,0.18)]">
      <Image src={DEFAULT_HERO_BACKGROUND} alt="" width={1} height={1} priority className="pointer-events-none absolute opacity-0" aria-hidden="true" />

      <div className="hero-bg-layer absolute inset-0 z-0" style={{ backgroundImage: `url('${selectedBackground.image}')` }} aria-hidden="true" />
      {previousBackground ? (
        <div
          className="hero-bg-layer absolute inset-0 z-0 transition-opacity duration-[320ms] ease-out"
          style={{
            backgroundImage: `url('${previousBackground}')`,
            opacity: previousBackgroundVisible ? 1 : 0,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className="hero-cinematic-overlay absolute inset-0 z-0" aria-hidden="true" />

      <div className="absolute top-3 right-3 z-20 rounded-2xl border border-[#E6C86D]/40 bg-[#2C1B12]/70 p-2.5 backdrop-blur-sm sm:top-4 sm:right-4 sm:p-3">
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F4E5C7]"><ImageIcon size={14} strokeWidth={1.9} />Background</p>

        <div className="mt-2 hidden gap-1.5 xl:flex">
          {HERO_BACKGROUNDS.map((background) => {
            const isActive = selectedId === background.id;
            return (
              <button
                key={background.id}
                type="button"
                onClick={() => handleBackgroundChange(background.id)}
                aria-pressed={isActive}
                className={[
                  'rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5',
                  isActive
                    ? 'border-[#D4A017] bg-[#D4A017] text-[#2C1B12]'
                    : 'border-[#E6C86D]/55 bg-[#FFF7E8]/10 text-[#FFF7E8] hover:bg-[#FFF7E8]/20 hover:shadow-[0_8px_20px_rgba(16,46,106,0.2)]',
                ].join(' ')}
              >
                {background.name}
              </button>
            );
          })}
        </div>

        <div className="xl:hidden">
          <label className="sr-only" htmlFor="hero-background-selector">
            Background
          </label>
          <select
            id="hero-background-selector"
            value={selectedId}
            onChange={(event) => handleBackgroundChange(event.target.value)}
            className="h-9 max-w-[180px] rounded-xl border border-[#E6C86D]/55 bg-[#FFF7E8] px-2.5 text-xs text-[#3A2417] outline-none ring-[#D4A017] focus:ring-2 sm:max-w-[210px] sm:text-sm"
          >
            {HERO_BACKGROUNDS.map((background) => (
              <option key={background.id} value={background.id}>
                {background.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative z-10 space-y-7 p-5 pt-20 sm:p-7 sm:pt-20 lg:p-10 lg:pt-24">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-4xl leading-[0.98] sm:text-5xl lg:text-6xl">Gatekeeper Dusun Dictionary V1</h2>
          <p className="max-w-xl text-base leading-relaxed text-[#F4E5C7] sm:text-lg">
            Preserving the Language, Culture and
            <br />
            Heritage of Borneo.
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-[#E6C86D]">Owned &amp; Developed by</p>
          <p className="text-sm font-semibold tracking-[0.2em] text-[#FFF7E8] sm:text-base">BORNEO LAND GATEKEEPER</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl rounded-[20px] border border-[#E6C86D]/40 bg-[#FFF7E8] p-2.5 text-[#3A2417] shadow-[0_12px_30px_rgba(44,27,18,0.22)]"
        >
          <label className="sr-only" htmlFor="home-search">
            Search the dictionary
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#8A6837]">
                <Search size={19} strokeWidth={1.9} />
              </span>
              <input
                id="home-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Dusun words or meanings"
                className="h-12 w-full rounded-2xl border border-[#DCC495] bg-[#FFFDF8] pr-4 pl-10 text-sm outline-none ring-[#D4A017] placeholder:text-[#8A735D] focus:ring-2 sm:h-14 sm:text-base"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex h-12 items-center gap-2 rounded-2xl border border-[#C7922B] bg-[#D4A017] px-6 text-sm font-semibold text-[#2C1B12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E2B541] hover:shadow-[0_10px_24px_rgba(16,46,106,0.18)] sm:h-14"
            >
              <Search size={18} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              Search
            </button>
          </div>
        </form>

        <div className="grid gap-3 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={[
                'group flex min-h-[148px] flex-col rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5',
                action.primary
                  ? 'border-[#D4A017] bg-[#173D24] text-[#FFF7E8] shadow-[0_10px_24px_rgba(15,46,27,0.32)]'
                  : 'border-[#D4A017]/65 bg-[#FFF7E8] text-[#3A2417] hover:bg-[#FFF2D4] hover:shadow-[0_12px_24px_rgba(16,46,106,0.14)]',
              ].join(' ')}
            >
              <span
                className={[
                  'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold',
                  action.primary
                    ? 'border-[#E6C86D] bg-[#0F2E1B] text-[#FFF7E8]'
                    : 'border-[#D4A017]/70 bg-[#FFFDF8] text-[#6A4A1F]',
                ].join(' ')}
              >
                <action.icon size={18} strokeWidth={1.9} />
              </span>
              <p className="mt-3 text-base font-semibold leading-tight">{action.label}</p>
              <p className={action.primary ? 'mt-1 text-xs text-[#E0CCA1]' : 'mt-1 text-xs text-[#75583A]'}>{action.description}</p>
              <span className="mt-auto ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D4A017]/70 text-sm transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
