import React from 'react';

const Header = () => {
  return (
    <header className="relative z-20 flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">🎮</span>
        </div>
        <span className="text-white font-medium">Welcome, bruh!</span>
      </div>
      
      <button className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-black">
        Login
      </button>
    </header>
  );
};

export default Header;