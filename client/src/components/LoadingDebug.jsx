import React from 'react';

const LoadingDebug = ({ telegramLoading, giftLoading, user, cases, balance }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 z-[9999] text-xs">
      <div className="max-w-md mx-auto">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <div className="space-y-1">
          <div>Telegram Loading: <span className={telegramLoading ? 'text-red-400' : 'text-green-400'}>{telegramLoading ? 'true' : 'false'}</span></div>
          <div>Gift Loading: <span className={giftLoading ? 'text-red-400' : 'text-green-400'}>{giftLoading ? 'true' : 'false'}</span></div>
          <div>User: <span className="text-blue-400">{user ? user.first_name : 'null'}</span></div>
          <div>Cases Count: <span className="text-yellow-400">{cases?.length || 0}</span></div>
          <div>Balance: <span className="text-green-400">{balance}</span></div>
          <div>WebApp: <span className={window.Telegram?.WebApp ? 'text-green-400' : 'text-red-400'}>{window.Telegram?.WebApp ? 'Available' : 'Not available'}</span></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDebug; 