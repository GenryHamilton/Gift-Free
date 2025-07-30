// Утилита для отладки загрузки данных
export const debugDataLoading = () => {
  console.log('=== DEBUG DATA LOADING ===');
  
  try {
    // Проверяем импорт данных
    console.log('Checking data imports...');
    
    const giftsData = require('../../data.json');
    console.log('✅ data.json loaded:', giftsData.gifts?.length || 0, 'gifts');
    
    const casesData = require('../../cases.json');
    console.log('✅ cases.json loaded:', casesData.cases?.length || 0, 'cases');
    
    // Проверяем структуру данных
    if (giftsData.gifts && giftsData.gifts.length > 0) {
      console.log('✅ First gift:', giftsData.gifts[0]);
    }
    
    if (casesData.cases && casesData.cases.length > 0) {
      console.log('✅ First case:', casesData.cases[0]);
    }
    
    console.log('=== DATA LOADING SUCCESS ===');
    return true;
    
  } catch (error) {
    console.error('❌ Error loading data:', error);
    return false;
  }
};

// Проверка Telegram Web App
export const debugTelegramWebApp = () => {
  console.log('=== DEBUG TELEGRAM WEB APP ===');
  
  if (window.Telegram && window.Telegram.WebApp) {
    console.log('✅ Telegram WebApp found');
    console.log('WebApp object:', window.Telegram.WebApp);
    console.log('User data:', window.Telegram.WebApp.initDataUnsafe?.user);
    console.log('Color scheme:', window.Telegram.WebApp.colorScheme);
    return true;
  } else {
    console.log('❌ Telegram WebApp not found');
    console.log('window.Telegram:', window.Telegram);
    return false;
  }
};

// Проверка всех зависимостей
export const debugDependencies = () => {
  console.log('=== DEBUG DEPENDENCIES ===');
  
  const checks = {
    'React': typeof React !== 'undefined',
    'React Router': typeof window !== 'undefined' && window.location,
    'Framer Motion': typeof window !== 'undefined' && window.__FRAMER_MOTION__,
    'Lucide React': typeof window !== 'undefined',
  };
  
  Object.entries(checks).forEach(([name, available]) => {
    console.log(`${available ? '✅' : '❌'} ${name}: ${available ? 'Available' : 'Not available'}`);
  });
  
  return checks;
}; 