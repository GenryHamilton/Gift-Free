import giftsData from '../../data.json';

export const localDataService = {
  // Получить все подарки
  getAllGifts: () => {
    return giftsData.gifts;
  },

  // Получить подарки по категории
  getGiftsByCategory: (category) => {
    if (category === 'all') {
      return giftsData.gifts;
    }
    return giftsData.gifts_collection.categories[category] || [];
  },

  // Получить подарки по классу
  getGiftsByClass: (giftClass) => {
    if (giftClass === 'all') {
      return giftsData.gifts;
    }
    return giftsData.gifts.filter(gift => gift.class === giftClass);
  },

  // Получить подарок по ID
  getGiftById: (id) => {
    return giftsData.gifts.find(gift => gift.id === id);
  },

  // Получить статистику коллекции
  getCollectionStats: () => {
    return {
      title: giftsData.gifts_collection.title,
      description: giftsData.gifts_collection.description,
      totalItems: giftsData.gifts_collection.total_items,
      priceRange: giftsData.gifts_collection.price_range,
    };
  },

  // Получить все доступные классы подарков
  getGiftClasses: () => {
    const classes = [...new Set(giftsData.gifts.map(gift => gift.class))];
    return classes.map(className => ({
      id: className,
      name: getClassDisplayName(className),
      icon: getClassIcon(className)
    }));
  },

  // Получить все доступные категории
  getCategories: () => {
    return [
      { id: 'all', name: 'Все подарки', icon: 'Gift' },
      { id: 'budget', name: 'Бюджетные', icon: 'Coins' },
      { id: 'medium', name: 'Средние', icon: 'Star' },
      { id: 'premium', name: 'Премиум', icon: 'Crown' }
    ];
  },

  // Поиск подарков
  searchGifts: (query) => {
    const searchTerm = query.toLowerCase();
    return giftsData.gifts.filter(gift => 
      gift.name.toLowerCase().includes(searchTerm) ||
      gift.base_name.toLowerCase().includes(searchTerm) ||
      gift.class.toLowerCase().includes(searchTerm)
    );
  },

  // Фильтрация подарков
  filterGifts: (filters) => {
    let filteredGifts = giftsData.gifts;

    // Фильтр по категории
    if (filters.category && filters.category !== 'all') {
      filteredGifts = localDataService.getGiftsByCategory(filters.category);
    }

    // Фильтр по классу
    if (filters.class && filters.class !== 'all') {
      filteredGifts = filteredGifts.filter(gift => gift.class === filters.class);
    }

    // Фильтр по цене
    if (filters.minPrice) {
      filteredGifts = filteredGifts.filter(gift => gift.price_ton >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filteredGifts = filteredGifts.filter(gift => gift.price_ton <= filters.maxPrice);
    }

    // Сортировка
    if (filters.sortBy) {
      filteredGifts = sortGifts(filteredGifts, filters.sortBy);
    }

    return filteredGifts;
  }
};

// Вспомогательные функции
function getClassDisplayName(className) {
  const classNames = {
    'food': 'Еда',
    'accessory': 'Аксессуары',
    'mystic': 'Мистические',
    'utility': 'Утилитарные',
    'drink': 'Напитки',
    'celebration': 'Праздничные',
    'tech': 'Технологические',
    'romantic': 'Романтические',
    'jewelry': 'Украшения',
    'cosmic': 'Космические'
  };
  return classNames[className] || className;
}

function getClassIcon(className) {
  const classIcons = {
    'food': '🍰',
    'accessory': '🎩',
    'mystic': '🔮',
    'utility': '📅',
    'drink': '🍷',
    'celebration': '🎉',
    'tech': '📱',
    'romantic': '💕',
    'jewelry': '💍',
    'cosmic': '⭐'
  };
  return classIcons[className] || '🎁';
}

function sortGifts(gifts, sortBy) {
  const sortedGifts = [...gifts];
  
  switch (sortBy) {
    case 'price_low':
      return sortedGifts.sort((a, b) => a.price_ton - b.price_ton);
    case 'price_high':
      return sortedGifts.sort((a, b) => b.price_ton - a.price_ton);
    case 'name':
      return sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
    case 'class':
      return sortedGifts.sort((a, b) => a.class.localeCompare(b.class));
    default:
      return sortedGifts;
  }
}

export default localDataService; 