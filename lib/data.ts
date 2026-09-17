export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Faisalabad',
  'Peshawar',
  'Quetta',
] as const

export type City = (typeof CITIES)[number]

/* ---------------------------------- stats --------------------------------- */

export const STATS = [
  { value: '340+', label: 'Clubs registered' },
  { value: '12,800+', label: 'Matches played' },
  { value: '180+', label: 'Arenas listed' },
  { value: '28', label: 'Cities covered' },
]

/* --------------------------------- matches -------------------------------- */

export type MatchType = 'h2h' | 'open'

export type Match = {
  id: string
  type: MatchType
  home: string
  away: string | null
  city: City
  venue: string
  date: string
  time: string
  format: string
  slotsNeeded?: number
  fee: string
}

export const MATCHES: Match[] = [
  {
    id: 'm1',
    type: 'h2h',
    home: 'Karachi United FC',
    away: 'Lyari Town Rangers',
    city: 'Karachi',
    venue: 'KPT Sports Complex',
    date: 'Fri 04 Sep',
    time: '20:30',
    format: '11-a-side',
    fee: 'Rs 6,000',
  },
  {
    id: 'm2',
    type: 'open',
    home: 'Model Town Strikers',
    away: null,
    city: 'Lahore',
    venue: 'Gaddafi Turf Arena',
    date: 'Sat 05 Sep',
    time: '18:00',
    format: '7-a-side',
    slotsNeeded: 4,
    fee: 'Rs 900 / player',
  },
  {
    id: 'm3',
    type: 'h2h',
    home: 'Islamabad Eagles',
    away: 'Margalla FC',
    city: 'Islamabad',
    venue: 'F-9 Football Ground',
    date: 'Sat 05 Sep',
    time: '21:00',
    format: '11-a-side',
    fee: 'Rs 7,500',
  },
  {
    id: 'm4',
    type: 'open',
    home: 'Saddar Futsal Club',
    away: null,
    city: 'Karachi',
    venue: 'Dome Futsal Court',
    date: 'Sun 06 Sep',
    time: '23:00',
    format: 'Futsal 5v5',
    slotsNeeded: 2,
    fee: 'Rs 700 / player',
  },
  {
    id: 'm5',
    type: 'h2h',
    home: 'Peshawar Pathans SC',
    away: 'Khyber Warriors',
    city: 'Peshawar',
    venue: 'Qayyum Stadium Annex',
    date: 'Sun 06 Sep',
    time: '17:30',
    format: '11-a-side',
    fee: 'Rs 5,500',
  },
  {
    id: 'm6',
    type: 'open',
    home: 'Iqbal Town Athletic',
    away: null,
    city: 'Faisalabad',
    venue: 'Chenab Sports Arena',
    date: 'Mon 07 Sep',
    time: '19:00',
    format: '7-a-side',
    slotsNeeded: 6,
    fee: 'Rs 800 / player',
  },
  {
    id: 'm7',
    type: 'h2h',
    home: 'Quetta Zorawar',
    away: 'Hazara Town FC',
    city: 'Quetta',
    venue: 'Ayub Stadium Turf',
    date: 'Tue 08 Sep',
    time: '16:00',
    format: '11-a-side',
    fee: 'Rs 4,800',
  },
  {
    id: 'm8',
    type: 'open',
    home: 'DHA Phase 6 Ballers',
    away: null,
    city: 'Lahore',
    venue: 'Turf Republic Lahore',
    date: 'Wed 09 Sep',
    time: '22:00',
    format: 'Futsal 5v5',
    slotsNeeded: 3,
    fee: 'Rs 650 / player',
  },
]

/* --------------------------------- arenas --------------------------------- */

export type Arena = {
  id: string
  name: string
  city: City
  area: string
  image: string
  sports: string[]
  price: string
  rating: number
  reviews: number
  status: 'open' | 'limited' | 'full'
  nextSlot: string
  surface: string
}

export const ARENAS: Arena[] = [
  {
    id: 'a1',
    name: 'Turf Republic',
    city: 'Karachi',
    area: 'DHA Phase 8',
    image: '/images/arena-1.png',
    sports: ['Football', 'Futsal', 'Cricket'],
    price: 'Rs 4,500 / hr',
    rating: 4.8,
    reviews: 214,
    status: 'open',
    nextSlot: 'Today 21:00',
    surface: 'FIFA Quality turf · Floodlit',
  },
  {
    id: 'a2',
    name: 'The Dome Futsal Court',
    city: 'Lahore',
    area: 'Gulberg III',
    image: '/images/arena-2.png',
    sports: ['Futsal', 'Padel'],
    price: 'Rs 3,200 / hr',
    rating: 4.6,
    reviews: 168,
    status: 'limited',
    nextSlot: 'Tomorrow 23:00',
    surface: 'Indoor hardcourt · AC',
  },
  {
    id: 'a3',
    name: 'Capital Sports Complex',
    city: 'Islamabad',
    area: 'Sector F-9',
    image: '/images/arena-3.png',
    sports: ['Football', 'Athletics'],
    price: 'Rs 6,000 / hr',
    rating: 4.9,
    reviews: 91,
    status: 'open',
    nextSlot: 'Today 18:30',
    surface: 'Natural grass · Full size',
  },
  {
    id: 'a4',
    name: 'Chenab Sports Arena',
    city: 'Faisalabad',
    area: 'Iqbal Town',
    image: '/images/arena-1.png',
    sports: ['Football', 'Futsal'],
    price: 'Rs 2,800 / hr',
    rating: 4.4,
    reviews: 57,
    status: 'full',
    nextSlot: 'Thu 11 Sep 20:00',
    surface: 'Astro turf · Floodlit',
  },
  {
    id: 'a5',
    name: 'Khyber Turf Park',
    city: 'Peshawar',
    area: 'University Road',
    image: '/images/arena-2.png',
    sports: ['Football', 'Cricket'],
    price: 'Rs 2,500 / hr',
    rating: 4.3,
    reviews: 43,
    status: 'open',
    nextSlot: 'Today 17:00',
    surface: 'Astro turf · 7-a-side',
  },
  {
    id: 'a6',
    name: 'Zorawar Sports Ground',
    city: 'Quetta',
    area: 'Jinnah Town',
    image: '/images/arena-3.png',
    sports: ['Football'],
    price: 'Rs 2,000 / hr',
    rating: 4.1,
    reviews: 29,
    status: 'limited',
    nextSlot: 'Tomorrow 16:00',
    surface: 'Natural grass · Full size',
  },
]

/* ------------------------------- tournaments ------------------------------ */

export type Tournament = {
  id: string
  name: string
  city: City
  format: string
  prize: string
  entryFee: string
  teamsRegistered: number
  teamsTotal: number
  starts: string
  status: 'registering' | 'ongoing' | 'full'
  image: string
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: 'PlayPal National Cup',
    city: 'Karachi',
    format: '11-a-side · Knockout',
    prize: 'Rs 1,500,000',
    entryFee: 'Rs 25,000 / club',
    teamsRegistered: 22,
    teamsTotal: 32,
    starts: '12 Sep 2026',
    status: 'registering',
    image: '/images/tournament-trophy.png',
  },
  {
    id: 't2',
    name: 'Lahore Futsal Championship',
    city: 'Lahore',
    format: 'Futsal 5v5 · Groups + KO',
    prize: 'Rs 400,000',
    entryFee: 'Rs 8,000 / club',
    teamsRegistered: 16,
    teamsTotal: 16,
    starts: '01 Sep 2026',
    status: 'ongoing',
    image: '/images/stream-2.png',
  },
  {
    id: 't3',
    name: 'Islamabad Winter Shield',
    city: 'Islamabad',
    format: '7-a-side · League',
    prize: 'Rs 250,000',
    entryFee: 'Rs 6,500 / club',
    teamsRegistered: 24,
    teamsTotal: 24,
    starts: '20 Sep 2026',
    status: 'full',
    image: '/images/arena-3.png',
  },
  {
    id: 't4',
    name: 'Sindh Colleges Trophy',
    city: 'Karachi',
    format: '11-a-side · Groups',
    prize: 'Rs 300,000',
    entryFee: 'Rs 5,000 / club',
    teamsRegistered: 9,
    teamsTotal: 20,
    starts: '28 Sep 2026',
    status: 'registering',
    image: '/images/stream-1.png',
  },
]

/* --------------------------------- players -------------------------------- */

export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'

export type Player = {
  id: string
  name: string
  club: string
  city: City
  position: Position
  age: number
  number: number
  foot: 'Left' | 'Right'
  matches: number
  goals?: number
  cleanSheets?: number
  image: string
}

export const POSITIONS: Position[] = [
  'Goalkeeper',
  'Defender',
  'Midfielder',
  'Forward',
]

export const POSITION_STYLES: Record<
  Position,
  { text: string; bg: string; border: string; short: string }
> = {
  Forward: {
    text: 'text-pos-forward',
    bg: 'bg-pos-forward',
    border: 'border-pos-forward',
    short: 'FWD',
  },
  Midfielder: {
    text: 'text-pos-midfielder',
    bg: 'bg-pos-midfielder',
    border: 'border-pos-midfielder',
    short: 'MID',
  },
  Defender: {
    text: 'text-pos-defender',
    bg: 'bg-pos-defender',
    border: 'border-pos-defender',
    short: 'DEF',
  },
  Goalkeeper: {
    text: 'text-pos-goalkeeper',
    bg: 'bg-pos-goalkeeper',
    border: 'border-pos-goalkeeper',
    short: 'GK',
  },
}

export const PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Hasnain Raza',
    club: 'Karachi United FC',
    city: 'Karachi',
    position: 'Forward',
    age: 23,
    number: 9,
    foot: 'Right',
    matches: 64,
    goals: 41,
    image: '/images/player-1.png',
  },
  {
    id: 'p2',
    name: 'Bilal Ahmed',
    club: 'Model Town Strikers',
    city: 'Lahore',
    position: 'Midfielder',
    age: 26,
    number: 8,
    foot: 'Left',
    matches: 88,
    goals: 19,
    image: '/images/player-2.png',
  },
  {
    id: 'p3',
    name: 'Zohaib Khan',
    club: 'Islamabad Eagles',
    city: 'Islamabad',
    position: 'Goalkeeper',
    age: 29,
    number: 1,
    foot: 'Right',
    matches: 102,
    cleanSheets: 38,
    image: '/images/player-3.png',
  },
  {
    id: 'p4',
    name: 'Umair Siddiqui',
    club: 'Lyari Town Rangers',
    city: 'Karachi',
    position: 'Defender',
    age: 25,
    number: 4,
    foot: 'Right',
    matches: 76,
    goals: 5,
    image: '/images/player-4.png',
  },
  {
    id: 'p5',
    name: 'Faizan Tariq',
    club: 'Peshawar Pathans SC',
    city: 'Peshawar',
    position: 'Forward',
    age: 21,
    number: 11,
    foot: 'Left',
    matches: 39,
    goals: 24,
    image: '/images/player-2.png',
  },
  {
    id: 'p6',
    name: 'Arsalan Javed',
    club: 'Iqbal Town Athletic',
    city: 'Faisalabad',
    position: 'Midfielder',
    age: 24,
    number: 6,
    foot: 'Right',
    matches: 58,
    goals: 12,
    image: '/images/player-1.png',
  },
  {
    id: 'p7',
    name: 'Danish Baloch',
    club: 'Quetta Zorawar',
    city: 'Quetta',
    position: 'Defender',
    age: 28,
    number: 3,
    foot: 'Left',
    matches: 94,
    goals: 3,
    image: '/images/player-4.png',
  },
  {
    id: 'p8',
    name: 'Kamran Yousaf',
    club: 'Turf Republic Lahore',
    city: 'Lahore',
    position: 'Goalkeeper',
    age: 22,
    number: 12,
    foot: 'Right',
    matches: 31,
    cleanSheets: 11,
    image: '/images/player-3.png',
  },
]

/* ---------------------------------- store --------------------------------- */

export type ProductCategory = 'Equipment' | 'Jerseys'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: string
  oldPrice?: string
  image: string
  tag?: string
  spec: string
}

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'PlayPal Match Ball',
    category: 'Equipment',
    price: 'Rs 4,200',
    oldPrice: 'Rs 5,000',
    image: '/images/product-ball.png',
    tag: 'Best seller',
    spec: 'Size 5 · Hand-stitched · FIFA Basic',
  },
  {
    id: 's2',
    name: 'Grip Pro Keeper Gloves',
    category: 'Equipment',
    price: 'Rs 5,800',
    image: '/images/product-gloves.png',
    spec: '4mm German latex · Negative cut',
  },
  {
    id: 's3',
    name: 'Carbon Shell Shin Guards',
    category: 'Equipment',
    price: 'Rs 2,400',
    image: '/images/product-shinguards.png',
    spec: 'Carbon composite · Ankle sleeve',
  },
  {
    id: 's4',
    name: 'Custom Name Jersey',
    category: 'Jerseys',
    price: 'Rs 3,600',
    image: '/images/product-jersey.png',
    tag: 'Customisable',
    spec: 'Dri-mesh · Your name & number',
  },
  {
    id: 's5',
    name: 'Club Kit Pack (11 sets)',
    category: 'Jerseys',
    price: 'Rs 38,000',
    oldPrice: 'Rs 44,000',
    image: '/images/product-jersey.png',
    tag: 'Club deal',
    spec: 'Shirts + shorts + socks · Full print',
  },
  {
    id: 's6',
    name: 'Training Bib Set (10)',
    category: 'Equipment',
    price: 'Rs 3,100',
    image: '/images/product-shinguards.png',
    spec: 'Lightweight mesh · 2 colours',
  },
]

/* -------------------------------- streaming ------------------------------- */

export type Stream = {
  id: string
  title: string
  subtitle: string
  image: string
  status: 'live' | 'upcoming' | 'free'
  viewers?: string
  kickoff?: string
  locked: boolean
}

export const STREAMS: Stream[] = [
  {
    id: 'st1',
    title: 'Karachi United vs Lyari Town Rangers',
    subtitle: 'National Cup · Round of 32',
    image: '/images/stream-1.png',
    status: 'live',
    viewers: '8,412',
    locked: true,
  },
  {
    id: 'st2',
    title: 'Lahore Futsal Championship · Semi Final',
    subtitle: 'The Dome Futsal Court, Gulberg',
    image: '/images/stream-2.png',
    status: 'upcoming',
    kickoff: 'Tonight 22:00 PKT',
    locked: true,
  },
  {
    id: 'st3',
    title: 'Islamabad Eagles vs Margalla FC',
    subtitle: 'Friendly · Free for all users',
    image: '/images/stream-3.png',
    status: 'free',
    viewers: '1,290',
    locked: false,
  },
]

export const STREAM_PASSES = [
  {
    name: 'Match Pass',
    price: 'Rs 199',
    period: 'per match',
    features: [
      'One full match in HD',
      '48-hour replay access',
      'Live match commentary',
      'Works on 1 device',
    ],
    featured: false,
  },
  {
    name: 'Monthly Pass',
    price: 'Rs 999',
    period: 'per month',
    features: [
      'Unlimited league & club matches',
      'Full HD + multi-angle feeds',
      'All replays & highlights',
      'Works on 2 devices',
      'Ad-free viewing',
    ],
    featured: true,
  },
  {
    name: 'Season Pass',
    price: 'Rs 4,999',
    period: 'per season',
    features: [
      'Every match, every tournament',
      '4K where available',
      'Full archive & bracket replays',
      'Works on 4 devices',
      '10% off the PlayPal store',
    ],
    featured: false,
  },
]
