import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { localDataService } from '../services/localData';

const GiftContext = createContext();

const initialState = {
  gifts: [],
  cases: [],
  myGifts: [],
  balance: 100, // Начальный баланс 0
  loading: true, // Изменено на true по умолчанию
  error: null,
  categories: [],
  giftClasses: [],
  collectionStats: null,
  filters: {
    category: 'all',
    class: 'all',
    minPrice: null,
    maxPrice: null,
    sortBy: 'name'
  }
};

const giftReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_GIFTS':
      return { ...state, gifts: action.payload, loading: false };
    case 'SET_CASES':
      return { ...state, cases: action.payload, loading: false };
    case 'ADD_GIFT':
      return { 
        ...state, 
        myGifts: [...state.myGifts, action.payload], 
        balance: state.balance - action.payload.price_ton, 
        loading: false 
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_GIFT_CLASSES':
      return { ...state, giftClasses: action.payload };
    case 'SET_COLLECTION_STATS':
      return { ...state, collectionStats: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'OPEN_CASE':
      return {
        ...state,
        balance: state.balance - action.payload.casePrice,
        loading: false
      };
    default:
      return state;
  }
};

export const GiftProvider = ({ children }) => {
  const [state, dispatch] = useReducer(giftReducer, initialState);

  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('Starting data initialization...');
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Загружаем подарки из оригинального data.json
        console.log('Loading gifts...');
        const gifts = localDataService.getAllGifts();
        console.log('Gifts loaded:', gifts.length);
        dispatch({ type: 'SET_GIFTS', payload: gifts });
        
        // Загружаем кейсы из cases.json
        console.log('Loading cases...');
        const cases = localDataService.getAllCases();
        console.log('Cases loaded:', cases.length);
        dispatch({ type: 'SET_CASES', payload: cases });
        
        // Загружаем категории
        console.log('Loading categories...');
        const categories = localDataService.getCategories();
        console.log('Categories loaded:', categories.length);
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
        
        // Загружаем классы подарков
        console.log('Loading gift classes...');
        const giftClasses = localDataService.getGiftClasses();
        console.log('Gift classes loaded:', giftClasses.length);
        dispatch({ type: 'SET_GIFT_CLASSES', payload: giftClasses });
        
        // Загружаем статистику коллекции
        console.log('Loading collection stats...');
        const collectionStats = localDataService.getCollectionStats();
        console.log('Collection stats loaded:', collectionStats);
        dispatch({ type: 'SET_COLLECTION_STATS', payload: collectionStats });
        
        console.log('Data initialization completed successfully');
        
      } catch (error) {
        console.error('Error initializing data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    // Добавляем небольшую задержку для стабилизации
    const timer = setTimeout(() => {
    initializeData();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const purchaseGift = (gift) => {
    if (state.balance >= gift.price_ton) {
      dispatch({ type: 'ADD_GIFT', payload: gift });
    }
  };

  const openCase = (caseData) => {
    if (state.balance >= caseData.price) {
      dispatch({ type: 'OPEN_CASE', payload: { casePrice: caseData.price } });
      
      // Получаем подарки из кейса
      const caseGifts = localDataService.getGiftsForCase(caseData.id);
      
      // Случайно выбираем подарок из кейса
      const randomGift = caseGifts[Math.floor(Math.random() * caseGifts.length)];
      
      if (randomGift) {
        dispatch({ type: 'ADD_GIFT', payload: randomGift });
      }
    }
  };

  const getFilteredGifts = () => localDataService.filterGifts(state.filters);
  const searchGifts = (query) => localDataService.searchGifts(query);
  const getGiftById = localDataService.getGiftById;
  const getGiftsByCategory = localDataService.getGiftsByCategory;
  const getGiftsByClass = localDataService.getGiftsByClass;
  const getCaseById = localDataService.getCaseById;
  const getGiftsForCase = localDataService.getGiftsForCase;

  const value = {
    ...state,
    purchaseGift,
    openCase,
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    getFilteredGifts,
    searchGifts,
    getGiftById,
    getGiftsByCategory,
    getGiftsByClass,
    getCaseById,
    getGiftsForCase,
  };

  return (
    <GiftContext.Provider value={value}>
      {children}
    </GiftContext.Provider>
  );
};

export const useGift = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
};