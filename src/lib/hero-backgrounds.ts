export type HeroBackground = {
  id: string;
  name: string;
  image: string;
};

export const HERO_BACKGROUNDS: HeroBackground[] = [
  {
    id: 'traditional-house',
    name: 'Traditional House',
    image: '/images/hero-traditional-house.png',
  },
  {
    id: 'kinabalu',
    name: 'Mount Kinabalu',
    image: '/images/hero-kinabalu.png',
  },
  {
    id: 'ricefield',
    name: 'Rice Fields',
    image: '/images/hero-ricefield.png',
  },
  {
    id: 'forest',
    name: 'Rainforest',
    image: '/images/hero-forest.png',
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    image: '/images/home-hero.png',
  },
];

export const DEFAULT_HERO_BACKGROUND = '/images/hero-traditional-house.png';
