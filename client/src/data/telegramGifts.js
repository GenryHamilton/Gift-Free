// Реальные подарки Telegram с изображениями и ценами в TON
export const telegramGifts = [
  {
    id: 1,
    name: 'Домашний торт',
    description: 'Вкусный домашний торт для особых моментов',
    price: 0.5, // в TON
    rarity: 'common',
    category: 'romantic',
    rating: 4.6,
    totalPurchases: 234,
    image: '/images/gifts/homemade-cake.png',
    emoji: '🍰',
    animation: 'cake-sparkle'
  },
  {
    id: 2,
    name: 'Кролик из желе',
    description: 'Милый желейный кролик приносит удачу',
    price: 0.3,
    rarity: 'common',
    category: 'premium',
    rating: 4.4,
    totalPurchases: 189,
    image: '/images/gifts/jelly-bunny.png',
    emoji: '🐰',
    animation: 'bunny-hop'
  },
  {
    id: 3,
    name: 'Глинтвейн',
    description: 'Согревающий глинтвейн для зимних вечеров',
    price: 0.8,
    rarity: 'rare',
    category: 'premium',
    rating: 4.7,
    totalPurchases: 156,
    image: '/images/gifts/spiced-wine.png',
    emoji: '🍷',
    animation: 'wine-steam'
  },
  {
    id: 4,
    name: 'Шапка Санты',
    description: 'Праздничная шапка Санта-Клауса',
    price: 1.2,
    rarity: 'epic',
    category: 'limited',
    rating: 4.8,
    totalPurchases: 98,
    image: '/images/gifts/santa-hat.png',
    emoji: '🎅',
    animation: 'santa-magic'
  },
  {
    id: 5,
    name: 'Звездная пыль',
    description: 'Магическая звездная пыль исполнения желаний',
    price: 2.5,
    rarity: 'legendary',
    category: 'premium',
    rating: 4.9,
    totalPurchases: 67,
    image: '/images/gifts/star-dust.png',
    emoji: '✨',
    animation: 'stardust-swirl'
  },
  {
    id: 6,
    name: 'Шоколадные конфеты',
    description: 'Изысканные шоколадные конфеты ручной работы',
    price: 0.4,
    rarity: 'common',
    category: 'romantic',
    rating: 4.3,
    totalPurchases: 312,
    image: '/images/gifts/chocolate-candies.png',
    emoji: '🍫',
    animation: 'chocolate-melt'
  },
  {
    id: 7,
    name: 'Букет роз',
    description: 'Прекрасный букет красных роз',
    price: 1.8,
    rarity: 'rare',
    category: 'romantic',
    rating: 4.8,
    totalPurchases: 145,
    image: '/images/gifts/rose-bouquet.png',
    emoji: '🌹',
    animation: 'rose-bloom'
  },
  {
    id: 8,
    name: 'Новогодняя елка',
    description: 'Праздничная новогодняя елка с игрушками',
    price: 3.0,
    rarity: 'epic',
    category: 'limited',
    rating: 4.9,
    totalPurchases: 89,
    image: '/images/gifts/christmas-tree.png',
    emoji: '🎄',
    animation: 'tree-lights'
  },
  {
    id: 9,
    name: 'Золотое сердце',
    description: 'Драгоценное золотое сердце как символ любви',
    price: 5.0,
    rarity: 'legendary',
    category: 'romantic',
    rating: 4.9,
    totalPurchases: 34,
    image: '/images/gifts/golden-heart.png',
    emoji: '💛',
    animation: 'heart-glow'
  },
  {
    id: 10,
    name: 'Фейерверк',
    description: 'Яркий фейерверк для празднования',
    price: 1.5,
    rarity: 'rare',
    category: 'premium',
    rating: 4.7,
    totalPurchases: 178,
    image: '/images/gifts/fireworks.png',
    emoji: '🎆',
    animation: 'firework-burst'
  },
  {
    id: 11,
    name: 'Единорог',
    description: 'Мифический единорог приносит магию',
    price: 7.5,
    rarity: 'mythic',
    category: 'limited',
    rating: 5.0,
    totalPurchases: 12,
    image: '/images/gifts/unicorn.png',
    emoji: '🦄',
    animation: 'unicorn-rainbow'
  },
  {
    id: 12,
    name: 'Воздушные шары',
    description: 'Красочные воздушные шары для праздника',
    price: 0.6,
    rarity: 'common',
    category: 'premium',
    rating: 4.2,
    totalPurchases: 267,
    image: '/images/gifts/balloons.png',
    emoji: '🎈',
    animation: 'balloon-float'
  },
  {
    id: 13,
    name: 'Кристалл удачи',
    description: 'Мистический кристалл приносящий удачу',
    price: 4.0,
    rarity: 'epic',
    category: 'premium',
    rating: 4.8,
    totalPurchases: 56,
    image: '/images/gifts/lucky-crystal.png',
    emoji: '💎',
    animation: 'crystal-shine'
  },
  {
    id: 14,
    name: 'Плюшевый мишка',
    description: 'Мягкий плюшевый мишка для объятий',
    price: 0.9,
    rarity: 'common',
    category: 'romantic',
    rating: 4.5,
    totalPurchases: 198,
    image: '/images/gifts/teddy-bear.png',
    emoji: '🧸',
    animation: 'bear-hug'
  },
  {
    id: 15,
    name: 'Драгоценная корона',
    description: 'Роскошная корона для настоящих королей',
    price: 10.0,
    rarity: 'mythic',
    category: 'limited',
    rating: 5.0,
    totalPurchases: 8,
    image: '/images/gifts/royal-crown.png',
    emoji: '👑',
    animation: 'crown-sparkle'
  }
];

export const giftCategories = [
  { id: 'all', name: 'Все', icon: 'Hexagon' },
  { id: 'premium', name: 'Премиум', icon: 'Star' },
  { id: 'limited', name: 'Лимитед', icon: 'Sparkles' },
  { id: 'romantic', name: 'Романтика', icon: 'Heart' },
];

export const giftRarities = [
  { id: 'all', name: 'Все' },
  { id: 'common', name: 'Обычные' },
  { id: 'rare', name: 'Редкие' },
  { id: 'epic', name: 'Эпические' },
  { id: 'legendary', name: 'Легендарные' },
  { id: 'mythic', name: 'Мифические' },
];

// Конвертация TON в рубли (примерный курс)
export const TON_TO_RUB_RATE = 320; // 1 TON ≈ 320 рублей

// Функция для получения цены в рублях
export const getTonPriceInRub = (tonPrice) => {
  return Math.round(tonPrice * TON_TO_RUB_RATE);
};