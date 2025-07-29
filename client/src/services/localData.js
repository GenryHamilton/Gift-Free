import giftsData from '../../data.json';
import casesData from '../../cases.json';

export const localDataService = {
  // Gifts methods (из оригинального data.json)
  getAllGifts: () => {
    return giftsData.gifts;
  },
  
  getGiftById: (id) => {
    return giftsData.gifts.find(gift => gift.id === id);
  },
  
  getGiftsByCategory: (category) => {
    // This would be implemented based on your category logic
    return giftsData.gifts.filter(gift => gift.class === category);
  },
  
  getGiftsByClass: (giftClass) => {
    return giftsData.gifts.filter(gift => gift.class === giftClass);
  },
  
  // Cases methods (из cases.json)
  getAllCases: () => {
    return casesData.cases;
  },
  
  getCaseById: (id) => {
    return casesData.cases.find(caseItem => caseItem.id === id);
  },
  
  getGiftsForCase: (caseId) => {
    const caseItem = casesData.cases.find(c => c.id === caseId);
    if (!caseItem) return [];
    
    return caseItem.gifts.map(giftId => 
      casesData.case_gifts.find(gift => gift.id === giftId)
    ).filter(Boolean);
  },
  
  // Categories and classes
  getCategories: () => {
    const categories = [
      { id: 'all', name: 'Все категории' },
      { id: 'budget', name: 'Бюджетные' },
      { id: 'medium', name: 'Средние' },
      { id: 'premium', name: 'Премиум' }
    ];
    return categories;
  },
  
  getGiftClasses: () => {
    const classes = [
      { id: 'all', name: 'Все классы', icon: '🎁' },
      { id: 'food', name: 'Еда', icon: '🍰' },
      { id: 'accessory', name: 'Аксессуары', icon: '🎩' },
      { id: 'mystic', name: 'Мистические', icon: '🔮' },
      { id: 'utility', name: 'Утилитарные', icon: '📅' },
      { id: 'drink', name: 'Напитки', icon: '🍷' },
      { id: 'celebration', name: 'Праздничные', icon: '🎉' },
      { id: 'tech', name: 'Технологические', icon: '📱' },
      { id: 'romantic', name: 'Романтические', icon: '💕' },
      { id: 'jewelry', name: 'Украшения', icon: '💍' },
      { id: 'cosmic', name: 'Космические', icon: '⭐' }
    ];
    return classes;
  },
  
  // Collection stats
  getCollectionStats: () => {
    return {
      title: giftsData.gifts_collection.title,
      description: giftsData.gifts_collection.description,
      totalItems: giftsData.gifts_collection.total_items,
      priceRange: giftsData.gifts_collection.price_range
    };
  },
  
  // Search and filter
  searchGifts: (query) => {
    const searchTerm = query.toLowerCase();
    return giftsData.gifts.filter(gift => 
      gift.name.toLowerCase().includes(searchTerm) ||
      gift.base_name.toLowerCase().includes(searchTerm) ||
      gift.class.toLowerCase().includes(searchTerm)
    );
  },
  
  filterGifts: (filters) => {
    let filteredGifts = [...giftsData.gifts];
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      // Implement category filtering logic
    }
    
    // Filter by class
    if (filters.class && filters.class !== 'all') {
      filteredGifts = filteredGifts.filter(gift => gift.class === filters.class);
    }
    
    // Filter by price range
    if (filters.minPrice !== null) {
      filteredGifts = filteredGifts.filter(gift => gift.price_ton >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      filteredGifts = filteredGifts.filter(gift => gift.price_ton <= filters.maxPrice);
    }
    
    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          filteredGifts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price_low':
          filteredGifts.sort((a, b) => a.price_ton - b.price_ton);
          break;
        case 'price_high':
          filteredGifts.sort((a, b) => b.price_ton - a.price_ton);
          break;
        case 'class':
          filteredGifts.sort((a, b) => a.class.localeCompare(b.class));
          break;
        default:
          break;
      }
    }
    
    return filteredGifts;
  }
};

// Helper functions
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
    case 'name':
      return sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
    case 'price_low':
      return sortedGifts.sort((a, b) => a.price_ton - b.price_ton);
    case 'price_high':
      return sortedGifts.sort((a, b) => b.price_ton - a.price_ton);
    case 'class':
      return sortedGifts.sort((a, b) => a.class.localeCompare(b.class));
    default:
      return sortedGifts;
  }
}

export default localDataService; 