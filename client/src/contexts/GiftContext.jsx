import React, { createContext, useContext, useReducer } from 'react';

const GiftContext = createContext();

const initialState = {
  gifts: [],
  myGifts: [],
  receivedGifts: [],
  loading: false,
  error: null,
  selectedGift: null,
  balance: 0,
  transactions: [],
};

const giftReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_GIFTS':
      return { ...state, gifts: action.payload, loading: false };
    
    case 'SET_MY_GIFTS':
      return { ...state, myGifts: action.payload, loading: false };
    
    case 'SET_RECEIVED_GIFTS':
      return { ...state, receivedGifts: action.payload, loading: false };
    
    case 'SET_SELECTED_GIFT':
      return { ...state, selectedGift: action.payload };
    
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    
    case 'ADD_GIFT':
      return { 
        ...state, 
        gifts: [...state.gifts, action.payload],
        loading: false 
      };
    
    case 'UPDATE_GIFT':
      return {
        ...state,
        gifts: state.gifts.map(gift => 
          gift.id === action.payload.id ? action.payload : gift
        ),
        loading: false
      };
    
    case 'PURCHASE_GIFT':
      return {
        ...state,
        myGifts: [...state.myGifts, action.payload],
        balance: state.balance - action.payload.price,
        loading: false
      };
    
    case 'SEND_GIFT':
      return {
        ...state,
        myGifts: state.myGifts.filter(gift => gift.id !== action.payload.id),
        loading: false
      };
    
    case 'RECEIVE_GIFT':
      return {
        ...state,
        receivedGifts: [...state.receivedGifts, action.payload],
        loading: false
      };
    
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    
    default:
      return state;
  }
};

export const GiftProvider = ({ children }) => {
  const [state, dispatch] = useReducer(giftReducer, initialState);

  const value = {
    ...state,
    dispatch,
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setGifts: (gifts) => dispatch({ type: 'SET_GIFTS', payload: gifts }),
    setMyGifts: (gifts) => dispatch({ type: 'SET_MY_GIFTS', payload: gifts }),
    setReceivedGifts: (gifts) => dispatch({ type: 'SET_RECEIVED_GIFTS', payload: gifts }),
    setSelectedGift: (gift) => dispatch({ type: 'SET_SELECTED_GIFT', payload: gift }),
    setBalance: (balance) => dispatch({ type: 'SET_BALANCE', payload: balance }),
    addGift: (gift) => dispatch({ type: 'ADD_GIFT', payload: gift }),
    updateGift: (gift) => dispatch({ type: 'UPDATE_GIFT', payload: gift }),
    purchaseGift: (gift) => dispatch({ type: 'PURCHASE_GIFT', payload: gift }),
    sendGift: (gift) => dispatch({ type: 'SEND_GIFT', payload: gift }),
    receiveGift: (gift) => dispatch({ type: 'RECEIVE_GIFT', payload: gift }),
    setTransactions: (transactions) => dispatch({ type: 'SET_TRANSACTIONS', payload: transactions }),
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